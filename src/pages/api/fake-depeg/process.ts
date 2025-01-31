// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { ethers, Signer } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getInstanceService } from '../../../backend/gif_registry';
import { DepegProduct__factory, ERC20__factory } from '../../../contracts/depeg-contracts';
import { redisClient } from '../../../utils/redis';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("fake-depeg process called");

    if (process.env.NEXT_PUBLIC_FEATURE_FAKE_DEPEG_ENABLED !== 'true') {
        res.status(400).json({ });
        return; 
    }

    const productOwnerSigner: Signer = getProductOwnerSigner();

    const latestBlockNumber = parseInt(await redisClient.get("fake-depeg-block-number") ?? '0');

    if (latestBlockNumber === 0) {
        console.log("no block number set");
        res.status(500).json({});
        return;
    }

    const depegProduct = DepegProduct__factory.connect(process.env.NEXT_PUBLIC_TERRAGUARD_CONTRACT_ADDRESS ?? "", productOwnerSigner);
    const instanceService = await getInstanceService(await depegProduct.getRegistry(), productOwnerSigner);
    const usd2 = ERC20__factory.connect(await depegProduct.getToken(), productOwnerSigner);

    const policies = (await depegProduct.policiesToProcess()).toNumber();
    console.log("policies to process: ", policies);

    let balances = [];
    let processIds = [];

    for (let p = 0; p < policies; p++) {
        const { processId, wallet } = await depegProduct.getPolicyToProcess(p);
        console.log("processing policy: ", processId, wallet);
        
        const { sumInsuredAmount }= await instanceService.getApplication(processId);
        console.log("sum insured: ", formatUnits(sumInsuredAmount, await usd2.decimals()));

        const balance = await depegProduct.createDepegBalance(wallet, latestBlockNumber, sumInsuredAmount);
        balances.push(balance);
        processIds.push(processId);
    }

    if (balances.length > 0) {
        await depegProduct.addDepegBalances(balances);
        console.log("balances added");
        await depegProduct.processPolicies(processIds);
        console.log("policies processed: ", processIds);
    }
    
    console.log("fake-depeg process done");
    res.status(200).json({});
}


function getProductOwnerSigner(): Signer {
    const mnemonic = process.env.NEXT_FAKE_DEPEG_PRODUCT_OWNER_MNEMONIC;
    if (!mnemonic) {
        throw new Error("Product owner mnemonic not set");
    }

    const provider = new StaticJsonRpcProvider(process.env.NEXT_PUBLIC_CHAIN_RPC_URL);
    const walletIndex = parseInt(process.env.NEXT_FAKE_DEPEG_PRODUCT_OWNER_HD_WALLET_INDEX ?? '0');
    return ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${walletIndex}`).connect(provider);
}
