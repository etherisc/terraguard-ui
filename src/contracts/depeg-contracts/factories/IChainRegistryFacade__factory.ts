/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IChainRegistryFacade,
  IChainRegistryFacadeInterface,
} from "../IChainRegistryFacade";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
    ],
    name: "exists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
    ],
    name: "getBundleNftId",
    outputs: [
      {
        internalType: "uint256",
        name: "nftId",
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
        name: "componentId",
        type: "uint256",
      },
    ],
    name: "getComponentNftId",
    outputs: [
      {
        internalType: "uint256",
        name: "nftId",
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
        name: "riskpoolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "displayName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "expiryAt",
        type: "uint256",
      },
    ],
    name: "registerBundle",
    outputs: [
      {
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IChainRegistryFacade__factory {
  static readonly abi = _abi;
  static createInterface(): IChainRegistryFacadeInterface {
    return new utils.Interface(_abi) as IChainRegistryFacadeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IChainRegistryFacade {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IChainRegistryFacade;
  }
}
