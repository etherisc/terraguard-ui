/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IChainRegistry,
  IChainRegistryInterface,
} from "../IChainRegistry";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
      {
        indexed: false,
        internalType: "ChainId",
        name: "chain",
        type: "bytes5",
      },
      {
        indexed: false,
        internalType: "ObjectType",
        name: "objectType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "enum IChainRegistry.ObjectState",
        name: "state",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "LogChainRegistryObjectRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
      {
        indexed: false,
        internalType: "enum IChainRegistry.ObjectState",
        name: "stateNew",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "enum IChainRegistry.ObjectState",
        name: "stateOld",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "address",
        name: "setBy",
        type: "address",
      },
    ],
    name: "LogChainRegistryObjectStateSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "Version",
        name: "version",
        type: "uint48",
      },
      {
        indexed: false,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "activatedBy",
        type: "address",
      },
    ],
    name: "LogVersionableActivated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
      {
        internalType: "address",
        name: "activatedBy",
        type: "address",
      },
    ],
    name: "activate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "blockNumber",
    outputs: [
      {
        internalType: "Blocknumber",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "chains",
    outputs: [
      {
        internalType: "uint256",
        name: "numberOfChains",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    name: "decodeBundleData",
    outputs: [
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
        internalType: "address",
        name: "token",
        type: "address",
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    name: "decodeComponentData",
    outputs: [
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
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    name: "decodeInstanceData",
    outputs: [
      {
        internalType: "bytes32",
        name: "instanceId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "registry",
        type: "address",
      },
      {
        internalType: "string",
        name: "displayName",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    name: "decodeRegistryData",
    outputs: [
      {
        internalType: "address",
        name: "registry",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    name: "decodeStakeData",
    outputs: [
      {
        internalType: "NftId",
        name: "target",
        type: "uint96",
      },
      {
        internalType: "ObjectType",
        name: "targetType",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    name: "decodeTokenData",
    outputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
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
        name: "componentId",
        type: "uint256",
      },
    ],
    name: "getBundleNftId",
    outputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idx",
        type: "uint256",
      },
    ],
    name: "getChainId",
    outputs: [
      {
        internalType: "ChainId",
        name: "chain",
        type: "bytes5",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "ChainId",
        name: "chain",
        type: "bytes5",
      },
    ],
    name: "getChainNftId",
    outputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
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
        internalType: "NftId",
        name: "id",
        type: "uint96",
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
    ],
    name: "getInstanceNftId",
    outputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
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
    ],
    name: "getInstanceServiceFacade",
    outputs: [
      {
        internalType: "contract IInstanceServiceFacade",
        name: "instanceService",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNft",
    outputs: [
      {
        internalType: "contract IChainNft",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "ChainId",
        name: "chain",
        type: "bytes5",
      },
      {
        internalType: "ObjectType",
        name: "t",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "idx",
        type: "uint256",
      },
    ],
    name: "getNftId",
    outputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    name: "getNftInfo",
    outputs: [
      {
        components: [
          {
            internalType: "NftId",
            name: "id",
            type: "uint96",
          },
          {
            internalType: "ChainId",
            name: "chain",
            type: "bytes5",
          },
          {
            internalType: "ObjectType",
            name: "objectType",
            type: "uint8",
          },
          {
            internalType: "enum IChainRegistry.ObjectState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            internalType: "Blocknumber",
            name: "mintedIn",
            type: "uint32",
          },
          {
            internalType: "Blocknumber",
            name: "updatedIn",
            type: "uint32",
          },
          {
            internalType: "Version",
            name: "version",
            type: "uint48",
          },
        ],
        internalType: "struct IChainRegistry.NftInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "ChainId",
        name: "chain",
        type: "bytes5",
      },
    ],
    name: "getRegistryNftId",
    outputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStaking",
    outputs: [
      {
        internalType: "contract IStaking",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "ChainId",
        name: "chain",
        type: "bytes5",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "getTokenNftId",
    outputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idx",
        type: "uint256",
      },
    ],
    name: "getVersion",
    outputs: [
      {
        internalType: "Version",
        name: "",
        type: "uint48",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "Version",
        name: "_version",
        type: "uint48",
      },
    ],
    name: "getVersionInfo",
    outputs: [
      {
        components: [
          {
            internalType: "Version",
            name: "version",
            type: "uint48",
          },
          {
            internalType: "address",
            name: "implementation",
            type: "address",
          },
          {
            internalType: "address",
            name: "activatedBy",
            type: "address",
          },
          {
            internalType: "Blocknumber",
            name: "activatedIn",
            type: "uint32",
          },
          {
            internalType: "Timestamp",
            name: "activatedAt",
            type: "uint40",
          },
        ],
        internalType: "struct IVersionable.VersionInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "implementsIChainRegistry",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "shift",
        type: "uint8",
      },
    ],
    name: "intToBytes",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "Version",
        name: "_version",
        type: "uint48",
      },
    ],
    name: "isActivated",
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
        internalType: "ChainId",
        name: "chain",
        type: "bytes5",
      },
      {
        internalType: "ObjectType",
        name: "t",
        type: "uint8",
      },
    ],
    name: "objects",
    outputs: [
      {
        internalType: "uint256",
        name: "numberOfObjects",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "nftOwner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "registry",
        type: "address",
      },
    ],
    name: "probeInstance",
    outputs: [
      {
        internalType: "bool",
        name: "isContract",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "contractSize",
        type: "uint256",
      },
      {
        internalType: "ChainId",
        name: "chain",
        type: "bytes5",
      },
      {
        internalType: "bytes32",
        name: "istanceId",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "isValidId",
        type: "bool",
      },
      {
        internalType: "contract IInstanceServiceFacade",
        name: "instanceService",
        type: "address",
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
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "ChainId",
        name: "chain",
        type: "bytes5",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "registerChain",
    outputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    stateMutability: "nonpayable",
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
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "registerComponent",
    outputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "instanceRegistry",
        type: "address",
      },
      {
        internalType: "string",
        name: "displayName",
        type: "string",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "registerInstance",
    outputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "ChainId",
        name: "chain",
        type: "bytes5",
      },
      {
        internalType: "address",
        name: "registry",
        type: "address",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "registerRegistry",
    outputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "target",
        type: "uint96",
      },
      {
        internalType: "address",
        name: "staker",
        type: "address",
      },
    ],
    name: "registerStake",
    outputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "ChainId",
        name: "chain",
        type: "bytes5",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "registerToken",
    outputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
      {
        internalType: "enum IChainRegistry.ObjectState",
        name: "state",
        type: "uint8",
      },
    ],
    name: "setObjectState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
    ],
    name: "toChain",
    outputs: [
      {
        internalType: "ChainId",
        name: "",
        type: "bytes5",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "ChainId",
        name: "x",
        type: "bytes5",
      },
    ],
    name: "toInt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "Blocknumber",
        name: "x",
        type: "uint32",
      },
    ],
    name: "toInt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "Timestamp",
        name: "x",
        type: "uint40",
      },
    ],
    name: "toInt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "Version",
        name: "",
        type: "uint48",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "versionParts",
    outputs: [
      {
        internalType: "VersionPart",
        name: "major",
        type: "uint16",
      },
      {
        internalType: "VersionPart",
        name: "minor",
        type: "uint16",
      },
      {
        internalType: "VersionPart",
        name: "patch",
        type: "uint16",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "versions",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IChainRegistry__factory {
  static readonly abi = _abi;
  static createInterface(): IChainRegistryInterface {
    return new utils.Interface(_abi) as IChainRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IChainRegistry {
    return new Contract(address, _abi, signerOrProvider) as IChainRegistry;
  }
}
