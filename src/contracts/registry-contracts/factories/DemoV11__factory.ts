/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { DemoV11, DemoV11Interface } from "../DemoV11";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "activate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
        name: "newOwner",
        type: "address",
      },
    ],
    name: "activateAndSetOwner",
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
        internalType: "struct Versionable.VersionInfo",
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
    inputs: [],
    name: "message",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newMessage",
        type: "string",
      },
    ],
    name: "setMessage",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "upgradable",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "value",
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
    stateMutability: "view",
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

const _bytecode =
  "0x60806040523480156200001157600080fd5b506200001d306200013f565b600254610100900460ff16158080156200003e5750600254600160ff909116105b806200005a5750303b1580156200005a575060025460ff166001145b620000c35760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6002805460ff191660011790558015620000e7576002805461ff0019166101001790555b620000f162000444565b801562000138576002805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5062000631565b3260006200014c620004ac565b65ffffffffffff8116600090815260208190526040902060010154909150600160a01b900463ffffffff1615620001d65760405162461bcd60e51b815260206004820152602760248201527f4552524f523a56524e2d3030313a56455253494f4e5f414c52454144595f41436044820152661512559055115160ca1b6064820152608401620000ba565b6001541562000299576001805460009190620001f4908290620005ef565b8154811062000207576200020762000605565b90600052602060002090600591828204019190066006029054906101000a900465ffffffffffff1690506200023d8282620004c2565b620002975760405162461bcd60e51b8152602060048201526024808201527f4552524f523a56524e2d3030323a56455253494f4e5f4e4f545f494e4352454160448201526353494e4760e01b6064820152608401620000ba565b505b60018054808201825560009190915260058082047fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf601805465ffffffffffff808616600694909506939093026101000a848102930219169190911790556040805160a0810182529182526001600160a01b03808616602084015284169082015260608101620003254390565b63ffffffff1681526020014264ffffffffff90811690915265ffffffffffff8084166000908152602081815260409182902085518154928701516001600160a01b039081166601000000000000026001600160d01b0319909416919095161791909117815584820151600190910180546060870151608090970151909516600160c01b0264ffffffffff60c01b1963ffffffff909716600160a01b026001600160c01b031990961692909416919091179390931793909316179055517ff7b17693e830f8b239607e857ac81b076450829d544c053d533d1b278d18cd8990620004379083908690869065ffffffffffff9390931683526001600160a01b03918216602084015216604082015260600190565b60405180910390a1505050565b600254610100900460ff16620004a05760405162461bcd60e51b815260206004820152602b60248201526000805160206200186e83398151915260448201526a6e697469616c697a696e6760a81b6064820152608401620000ba565b620004aa620004d7565b565b6000620004bd60018060006200053e565b905090565b65ffffffffffff808216908316115b92915050565b600254610100900460ff16620005335760405162461bcd60e51b815260206004820152602b60248201526000805160206200186e83398151915260448201526a6e697469616c697a696e6760a81b6064820152608401620000ba565b620004aa3362000587565b600061ffff84811690848116908416806200057063ffff0000601089901b1665ffff0000000060208b901b166200061b565b6200057c91906200061b565b979650505050505050565b603580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052601160045260246000fd5b81810381811115620004d157620004d1620005d9565b634e487b7160e01b600052603260045260246000fd5b80820180821115620004d157620004d1620005d9565b61122d80620006416000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c8063aa615ec8116100ad578063de788b2c11610071578063de788b2c146102a3578063e21f37ce14610316578063f2fde38b1461031e578063f4d26fec14610331578063f8b1cb3c1461033957600080fd5b8063aa615ec814610215578063b88da75914610238578063bd4080ec1461024b578063cd8e8d2314610278578063da09d4841461028b57600080fd5b806357e871e7116100f457806357e871e7146101b357806366362612146101c75780636effeac4146101db578063715018a6146101f25780638da5cb5b146101fa57600080fd5b80631080d895146101315780631c5a9d9c1461015a578063368b87721461016f5780633fa4f2451461018257806354fd4d5014610194575b600080fd5b61014461013f366004610d20565b610341565b6040516101519190610d9c565b60405180910390f35b61016d610168366004610dd2565b610377565b005b61016d61017d366004610e03565b610388565b6068545b604051908152602001610151565b61019c6103a0565b60405165ffffffffffff9091168152602001610151565b60405163ffffffff43168152602001610151565b6101866101d5366004610eb4565b60d81c90565b6101866101e9366004610ede565b63ffffffff1690565b61016d6103b4565b6035546040516001600160a01b039091168152602001610151565b610228610223366004610f04565b6103c8565b6040519015158152602001610151565b61019c610246366004610f2c565b6103f4565b61025361048f565b6040805161ffff94851681529284166020840152921691810191909152606001610151565b61016d610286366004610f45565b6104af565b610186610299366004610f78565b64ffffffffff1690565b6102b66102b1366004610f04565b6105c3565b60408051825165ffffffffffff1681526020808401516001600160a01b039081169183019190915283830151169181019190915260608083015163ffffffff169082015260809182015164ffffffffff169181019190915260a001610151565b6101446106c0565b61016d61032c366004610dd2565b610752565b6101446107cb565b600154610186565b6040805160ff831684901b60f01b6001600160f01b03191660208201528151600281830301815260229091019091525b92915050565b610380816107eb565b50602a606855565b610390610abe565b606761039c8282611027565b5050565b60006103af6001806000610b18565b905090565b6103bc610abe565b6103c66000610b5d565b565b65ffffffffffff16600090815260208190526040902060010154600160a01b900463ffffffff16151590565b600154600090821061044d5760405162461bcd60e51b815260206004820152601d60248201527f4552524f523a56524e2d3031303a494e4445585f544f4f5f4c4152474500000060448201526064015b60405180910390fd5b60018281548110610460576104606110e7565b90600052602060002090600591828204019190066006029054906101000a900465ffffffffffff169050919050565b60008060006104a461049f6103a0565b610baf565b925092509250909192565b600254610100900460ff16158080156104cf5750600254600160ff909116105b806104e95750303b1580156104e9575060025460ff166001145b6105055760405162461bcd60e51b8152600401610444906110fd565b6002805460ff191660011790558015610528576002805461ff0019166101001790555b6105328383610bf1565b6040518060400160405280602081526020017f7370656369616c206d657373616765202d20617320696e697469616c697a6564815250606790816105769190611027565b5080156105be576002805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498906020015b60405180910390a15b505050565b6040805160a0810182526000808252602082018190529181018290526060810182905260808101919091526105f7826103c8565b6106435760405162461bcd60e51b815260206004820152601d60248201527f4552524f523a56524e2d3032303a56455253494f4e5f554e4b4e4f574e0000006044820152606401610444565b5065ffffffffffff90811660009081526020818152604091829020825160a0810184528154948516815266010000000000009094046001600160a01b03908116928501929092526001015490811691830191909152600160a01b810463ffffffff166060830152600160c01b900464ffffffffff16608082015290565b6060606780546106cf90610f9f565b80601f01602080910402602001604051908101604052809291908181526020018280546106fb90610f9f565b80156107485780601f1061071d57610100808354040283529160200191610748565b820191906000526020600020905b81548152906001019060200180831161072b57829003601f168201915b5050505050905090565b61075a610abe565b6001600160a01b0381166107bf5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610444565b6107c881610b5d565b50565b60606040518060600160405280602581526020016111d360259139905090565b3260006107f66103a0565b9050610801816103c8565b1561085e5760405162461bcd60e51b815260206004820152602760248201527f4552524f523a56524e2d3030313a56455253494f4e5f414c52454144595f41436044820152661512559055115160ca1b6064820152608401610444565b60015415610922576001805460009190610879908290611161565b81548110610889576108896110e7565b90600052602060002090600591828204019190066006029054906101000a900465ffffffffffff1690506108c8828265ffffffffffff90811691161190565b6109205760405162461bcd60e51b8152602060048201526024808201527f4552524f523a56524e2d3030323a56455253494f4e5f4e4f545f494e4352454160448201526353494e4760e01b6064820152608401610444565b505b60018054808201825560009190915260058082047fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf601805465ffffffffffff808616600694909506939093026101000a848102930219169190911790556040805160a0810182529182526001600160a01b038086166020840152841690820152606081016109ad4390565b63ffffffff1681526020014264ffffffffff90811690915265ffffffffffff8084166000908152602081815260409182902085518154928701516001600160a01b039081166601000000000000026001600160d01b0319909416919095161791909117815584820151600190910180546060870151608090970151909516600160c01b0264ffffffffff60c01b1963ffffffff909716600160a01b026001600160c01b031990961692909416919091179390931793909316179055517ff7b17693e830f8b239607e857ac81b076450829d544c053d533d1b278d18cd89906105b59083908690869065ffffffffffff9390931683526001600160a01b03918216602084015216604082015260600190565b6035546001600160a01b031633146103c65760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610444565b600061ffff8481169084811690841680610b4863ffff0000601089901b1665ffff0000000060208b901b16611174565b610b529190611174565b979650505050505050565b603580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000808065ffffffffffff841661ffff602086901c16610bcf8383611161565b9150601082901c6000610be28185611161565b92989197509195509350505050565b600254610100900460ff1615808015610c115750600254600160ff909116105b80610c2b5750303b158015610c2b575060025460ff166001145b610c475760405162461bcd60e51b8152600401610444906110fd565b6002805460ff191660011790558015610c6a576002805461ff0019166101001790555b610c73836107eb565b610c7b610cc6565b610c8482610752565b80156105be576002805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498906020016105b5565b600254610100900460ff16610ced5760405162461bcd60e51b815260040161044490611187565b6103c6600254610100900460ff16610d175760405162461bcd60e51b815260040161044490611187565b6103c633610b5d565b60008060408385031215610d3357600080fd5b82359150602083013560ff81168114610d4b57600080fd5b809150509250929050565b6000815180845260005b81811015610d7c57602081850181015186830182015201610d60565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000610daf6020830184610d56565b9392505050565b80356001600160a01b0381168114610dcd57600080fd5b919050565b600060208284031215610de457600080fd5b610daf82610db6565b634e487b7160e01b600052604160045260246000fd5b600060208284031215610e1557600080fd5b813567ffffffffffffffff80821115610e2d57600080fd5b818401915084601f830112610e4157600080fd5b813581811115610e5357610e53610ded565b604051601f8201601f19908116603f01168101908382118183101715610e7b57610e7b610ded565b81604052828152876020848701011115610e9457600080fd5b826020860160208301376000928101602001929092525095945050505050565b600060208284031215610ec657600080fd5b81356001600160d81b031981168114610daf57600080fd5b600060208284031215610ef057600080fd5b813563ffffffff81168114610daf57600080fd5b600060208284031215610f1657600080fd5b813565ffffffffffff81168114610daf57600080fd5b600060208284031215610f3e57600080fd5b5035919050565b60008060408385031215610f5857600080fd5b610f6183610db6565b9150610f6f60208401610db6565b90509250929050565b600060208284031215610f8a57600080fd5b813564ffffffffff81168114610daf57600080fd5b600181811c90821680610fb357607f821691505b602082108103610fd357634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156105be57600081815260208120601f850160051c810160208610156110005750805b601f850160051c820191505b8181101561101f5782815560010161100c565b505050505050565b815167ffffffffffffffff81111561104157611041610ded565b6110558161104f8454610f9f565b84610fd9565b602080601f83116001811461108a57600084156110725750858301515b600019600386901b1c1916600185901b17855561101f565b600085815260208120601f198616915b828110156110b95788860151825594840194600190910190840161109a565b50858210156110d75787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052603260045260246000fd5b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201526d191e481a5b9a5d1a585b1a5e995960921b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b818103818111156103715761037161114b565b808201808211156103715761037161114b565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b60608201526080019056fe6865792066726f6d2075706772616461626c6544656d6f202d2044656d6f2076312e312e30a264697066735822122057197e9c8e6e76842758428235514c62b89f0fb4120de1ae8cb81fc50301111f64736f6c63430008130033496e697469616c697a61626c653a20636f6e7472616374206973206e6f742069";

type DemoV11ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DemoV11ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DemoV11__factory extends ContractFactory {
  constructor(...args: DemoV11ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DemoV11> {
    return super.deploy(overrides || {}) as Promise<DemoV11>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DemoV11 {
    return super.attach(address) as DemoV11;
  }
  override connect(signer: Signer): DemoV11__factory {
    return super.connect(signer) as DemoV11__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DemoV11Interface {
    return new utils.Interface(_abi) as DemoV11Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DemoV11 {
    return new Contract(address, _abi, signerOrProvider) as DemoV11;
  }
}
