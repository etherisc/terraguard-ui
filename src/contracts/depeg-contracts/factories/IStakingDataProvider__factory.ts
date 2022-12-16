/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IStakingDataProvider,
  IStakingDataProviderInterface,
} from "../IStakingDataProvider";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "instanceId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
    ],
    name: "getBundleStakes",
    outputs: [
      {
        internalType: "uint256",
        name: "stakedDipAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "instanceId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "getSupportedCapitalAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "supportedCapitalAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IStakingDataProvider__factory {
  static readonly abi = _abi;
  static createInterface(): IStakingDataProviderInterface {
    return new utils.Interface(_abi) as IStakingDataProviderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IStakingDataProvider {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IStakingDataProvider;
  }
}
