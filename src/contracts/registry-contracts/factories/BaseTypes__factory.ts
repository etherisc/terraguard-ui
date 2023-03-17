/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { BaseTypes, BaseTypesInterface } from "../BaseTypes";

const _abi = [
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610252806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80631080d8951461005c57806357e871e7146100b557806366362612146100c95780636effeac4146100eb578063da09d48414610102575b600080fd5b61009f61006a36600461011a565b6040805160ff929092169290921b60f01b6001600160f01b031916602082015281516002818303018152602290910190915290565b6040516100ac9190610150565b60405180910390f35b60405163ffffffff431681526020016100ac565b6100dd6100d736600461019e565b60d81c90565b6040519081526020016100ac565b6100dd6100f93660046101cf565b63ffffffff1690565b6100dd6101103660046101f5565b64ffffffffff1690565b6000806040838503121561012d57600080fd5b82359150602083013560ff8116811461014557600080fd5b809150509250929050565b600060208083528351808285015260005b8181101561017d57858101830151858201604001528201610161565b506000604082860101526040601f19601f8301168501019250505092915050565b6000602082840312156101b057600080fd5b81356001600160d81b0319811681146101c857600080fd5b9392505050565b6000602082840312156101e157600080fd5b813563ffffffff811681146101c857600080fd5b60006020828403121561020757600080fd5b813564ffffffffff811681146101c857600080fdfea2646970667358221220a522e7a63619988c01efbe4a5ae3c840d4f0d8288a1a0644210e14d1a2c22e3f64736f6c63430008130033";

type BaseTypesConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BaseTypesConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BaseTypes__factory extends ContractFactory {
  constructor(...args: BaseTypesConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BaseTypes> {
    return super.deploy(overrides || {}) as Promise<BaseTypes>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): BaseTypes {
    return super.attach(address) as BaseTypes;
  }
  override connect(signer: Signer): BaseTypes__factory {
    return super.connect(signer) as BaseTypes__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BaseTypesInterface {
    return new utils.Interface(_abi) as BaseTypesInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BaseTypes {
    return new Contract(address, _abi, signerOrProvider) as BaseTypes;
  }
}
