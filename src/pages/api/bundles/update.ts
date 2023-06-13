import { Signer } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import { BundleData } from "../../../backend/bundle_data";
import { getInstanceService, getTerraGuardRiskpool } from "../../../backend/gif_registry";
import { DepegRiskpoolApi } from "../../../backend/riskpool_api";
import { DepegProduct, DepegProduct__factory, DepegRiskpool, IInstanceService } from "../../../contracts/depeg-contracts";
import { getBackendVoidSigner } from "../../../utils/chain";
import { redisClient } from "../../../utils/redis";
import { isIpAllowedToConnect } from "../../../utils/check_ip";
import { TerraGuardProduct, TerraGuardRiskpool, TerraGuardProduct__factory } from "../../../contracts/terraguard-poc-contracts";

const depegProductContractAddress = process.env.NEXT_PUBLIC_DEPEG_CONTRACT_ADDRESS ?? "0x0";
const usd2Decimals = parseInt(process.env.NEXT_PUBLIC_USD2_DECIMALS ?? "6");

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Array<BundleData>>
) {
    console.log("called /api/bundles/update");

    if (! isIpAllowedToConnect(req, res)) {
        return;
    }

    const signer = await getBackendVoidSigner();
    const { terraGuardRiskpool, riskpoolId, instanceService } = await getRiskpool(signer);
    const riskpoolApi = new DepegRiskpoolApi(terraGuardRiskpool, riskpoolId, instanceService, usd2Decimals);
    await riskpoolApi.initialize();

    const updateOnlyBundle = req.query.bundleId as string;

    let bundles;

    if (updateOnlyBundle !== undefined) {
        console.log("fetching bundle", updateOnlyBundle);
        bundles = await updateBundle(riskpoolApi, parseInt(updateOnlyBundle));
    } else {
        console.log("fetching all bundles");
        bundles = await updateAllBundles(riskpoolApi);
    }

    res.status(200).json(bundles);
}

async function updateBundle(riskpoolApi: DepegRiskpoolApi, bundleId: number): Promise<Array<BundleData>> {
    const bundle = await riskpoolApi.getBundleDataByBundleId(bundleId);

    const storedBundles = await redisClient.get("bundles");
    const bundles = storedBundles ? JSON.parse(storedBundles) : [];
    // update bundle
    const index = bundles.findIndex((b: BundleData) => b.id === bundleId);
    if (index !== -1) {
        bundles[index] = bundle;
    } else {
        bundles.push(bundle);
    }

    await redisClient.set("bundles", JSON.stringify(bundles));
    return [bundle];
}

async function updateAllBundles(riskpoolApi: DepegRiskpoolApi): Promise<Array<BundleData>> {
    const bundles = await riskpoolApi.getBundleData();
    await redisClient.set("bundles", JSON.stringify(bundles));
    return bundles;
}

async function getRiskpool(signer: Signer): 
        Promise<{ 
            terraGuardProduct: TerraGuardProduct, 
            terraGuardRiskpool: TerraGuardRiskpool, 
            riskpoolId: number, 
            instanceService: IInstanceService 
        }> 
{
    const terraGuardProduct = TerraGuardProduct__factory.connect(depegProductContractAddress, signer);
    const registryAddress = await terraGuardProduct.getRegistry();
    const instanceService = await getInstanceService(registryAddress, signer);
    const riskpoolId = (await terraGuardProduct.getRiskpoolId()).toNumber();
    const terraGuardRiskpool = await getTerraGuardRiskpool(instanceService, riskpoolId);
    return { terraGuardProduct, terraGuardRiskpool, riskpoolId, instanceService };
}