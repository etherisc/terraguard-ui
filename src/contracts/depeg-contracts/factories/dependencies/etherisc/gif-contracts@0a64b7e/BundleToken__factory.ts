/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  BundleToken,
  BundleTokenInterface,
} from "../../../../dependencies/etherisc/gif-contracts@0a64b7e/BundleToken";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "LogBundleTokenBurned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenOwner",
        type: "address",
      },
    ],
    name: "LogBundleTokenMinted",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "NAME",
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
    name: "SYMBOL",
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
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "bundleIdForTokenId",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "burned",
    outputs: [
      {
        internalType: "bool",
        name: "isBurned",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getBundleId",
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
    name: "getBundleModuleAddress",
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
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "bundleModule",
        type: "address",
      },
    ],
    name: "setBundleModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    name: "symbol",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
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
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
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
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604080518082018252601081526f23a4a310213ab7323632902a37b5b2b760811b60208083019182528351808501909452600384526242544b60e81b9084015281519192916200006591600091620000f4565b5080516200007b906001906020840190620000f4565b50505062000098620000926200009e60201b60201c565b620000a2565b620001d7565b3390565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b82805462000102906200019a565b90600052602060002090601f01602090048101928262000126576000855562000171565b82601f106200014157805160ff191683800117855562000171565b8280016001018555821562000171579182015b828111156200017157825182559160200191906001019062000154565b506200017f92915062000183565b5090565b5b808211156200017f576000815560010162000184565b600281046001821680620001af57607f821691505b60208210811415620001d157634e487b7160e01b600052602260045260246000fd5b50919050565b611aa580620001e76000396000f3fe608060405234801561001057600080fd5b50600436106101a95760003560e01c80636ae9d6e8116100f9578063a38b714c11610097578063c87b56dd11610071578063c87b56dd146103b2578063e985e9c5146103c5578063f2fde38b14610401578063f76f8d7814610414576101a9565b8063a38b714c1461035d578063a3f4df7e14610370578063b88d4fde1461039f576101a9565b80638da5cb5b116100d35780638da5cb5b1461031e57806394bf804d1461032f57806395d89b4114610342578063a22cb4651461034a576101a9565b80636ae9d6e8146102e357806370a0823114610303578063715018a614610316576101a9565b806323b872dd1161016657806342966c681161014057806342966c68146102965780634f558e79146102a95780636352211e146102bf5780636ae73384146102d2576101a9565b806323b872dd1461025057806329a630831461026357806342842e0e14610283576101a9565b806301ffc9a7146101ae57806306fdde03146101d6578063081812fc146101eb578063095ea7b31461021657806318160ddd1461022b57806323250cae1461023d575b600080fd5b6101c16101bc366004611781565b610436565b60405190151581526020015b60405180910390f35b6101de61048a565b6040516101cd919061188b565b6101fe6101f93660046117b9565b61051c565b6040516001600160a01b0390911681526020016101cd565b610229610224366004611758565b610543565b005b6009545b6040519081526020016101cd565b6101c161024b3660046117b9565b61065e565b61022961025e36600461160e565b61068a565b61022f6102713660046117b9565b60009081526007602052604090205490565b61022961029136600461160e565b6106bb565b6102296102a43660046117b9565b6106d6565b6101c16102b73660046117b9565b600954101590565b6101fe6102cd3660046117b9565b61084a565b6008546001600160a01b03166101fe565b61022f6102f13660046117b9565b60076020526000908152604090205481565b61022f6103113660046115c2565b6108aa565b610229610930565b6006546001600160a01b03166101fe565b61022f61033d3660046117d1565b610944565b6101de610a85565b61022961035836600461171e565b610a94565b61022961036b3660046115c2565b610aa3565b6101de6040518060400160405280601081526020016f23a4a310213ab7323632902a37b5b2b760811b81525081565b6102296103ad366004611649565b610b9c565b6101de6103c03660046117b9565b610bd4565b6101c16103d33660046115dc565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b61022961040f3660046115c2565b610c48565b6101de6040518060400160405280600381526020016242544b60e81b81525081565b60006001600160e01b031982166380ac58cd60e01b148061046757506001600160e01b03198216635b5e139f60e01b145b8061048257506301ffc9a760e01b6001600160e01b03198316145b90505b919050565b606060008054610499906119ad565b80601f01602080910402602001604051908101604052809291908181526020018280546104c5906119ad565b80156105125780601f106104e757610100808354040283529160200191610512565b820191906000526020600020905b8154815290600101906020018083116104f557829003601f168201915b5050505050905090565b600061052782610cc1565b506000908152600460205260409020546001600160a01b031690565b600061054e8261084a565b9050806001600160a01b0316836001600160a01b031614156105c15760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806105dd57506105dd81336103d3565b61064f5760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c000060648201526084016105b8565b6106598383610d20565b505050565b600060095482111580156104825750506000908152600260205260409020546001600160a01b03161590565b6106943382610d8e565b6106b05760405162461bcd60e51b81526004016105b8906118f0565b610659838383610e0d565b61065983838360405180602001604052806000815250610b9c565b6008546001600160a01b031661072e5760405162461bcd60e51b815260206004820152601d60248201527f4552524f523a42544b2d3030313a4e4f545f494e495449414c495a454400000060448201526064016105b8565b6008546001600160a01b0316336001600160a01b0316146107915760405162461bcd60e51b815260206004820152601f60248201527f4552524f523a42544b2d3030323a4e4f545f42554e444c455f4d4f44554c450060448201526064016105b8565b6000818152600260205260409020546001600160a01b03166107f55760405162461bcd60e51b815260206004820152601e60248201527f4552524f523a42544b2d3030353a544f4b454e5f49445f494e56414c4944000060448201526064016105b8565b6107fe81610fa9565b6000818152600760209081526040918290205482519081529081018390527f9b94bd6eee531d53aaede5ff8a93d142b0afb2cf7fbbce1135a75efd7f29cb55910160405180910390a150565b6000818152600260205260408120546001600160a01b0316806104825760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016105b8565b60006001600160a01b0382166109145760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016105b8565b506001600160a01b031660009081526003602052604090205490565b610938611045565b610942600061109f565b565b6008546000906001600160a01b031661099f5760405162461bcd60e51b815260206004820152601d60248201527f4552524f523a42544b2d3030313a4e4f545f494e495449414c495a454400000060448201526064016105b8565b6008546001600160a01b0316336001600160a01b031614610a025760405162461bcd60e51b815260206004820152601f60248201527f4552524f523a42544b2d3030323a4e4f545f42554e444c455f4d4f44554c450060448201526064016105b8565b60098054906000610a12836119e8565b909155505060095460008181526007602052604090208490559050610a3782826110f1565b60408051848152602081018390526001600160a01b0384168183015290517ffd51d5a3232267986482b6be627e03dabfb0a2ce2025276823100423b5f558679181900360600190a192915050565b606060018054610499906119ad565b610a9f33838361110b565b5050565b6008546001600160a01b031615610b105760405162461bcd60e51b815260206004820152602b60248201527f4552524f523a42544b2d3030333a42554e444c455f4d4f44554c455f414c524560448201526a10511657d111519253915160aa1b60648201526084016105b8565b6001600160a01b038116610b7a5760405162461bcd60e51b815260206004820152602b60248201527f4552524f523a42544b2d3030343a494e56414c49445f42554e444c455f4d4f4460448201526a554c455f4144445245535360a81b60648201526084016105b8565b600880546001600160a01b0319166001600160a01b0392909216919091179055565b610ba63383610d8e565b610bc25760405162461bcd60e51b81526004016105b8906118f0565b610bce848484846111da565b50505050565b6060610bdf82610cc1565b6000610bf660408051602081019091526000815290565b90506000815111610c165760405180602001604052806000815250610c41565b80610c208461120d565b604051602001610c3192919061181f565b6040516020818303038152906040525b9392505050565b610c50611045565b6001600160a01b038116610cb55760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016105b8565b610cbe8161109f565b50565b6000818152600260205260409020546001600160a01b0316610cbe5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016105b8565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610d558261084a565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610d9a8361084a565b9050806001600160a01b0316846001600160a01b03161480610de157506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b80610e055750836001600160a01b0316610dfa8461051c565b6001600160a01b0316145b949350505050565b826001600160a01b0316610e208261084a565b6001600160a01b031614610e845760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b60648201526084016105b8565b6001600160a01b038216610ee65760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016105b8565b610ef1600082610d20565b6001600160a01b0383166000908152600360205260408120805460019290610f1a90849061196a565b90915550506001600160a01b0382166000908152600360205260408120805460019290610f4890849061193e565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4610659565b6000610fb48261084a565b9050610fc1600083610d20565b6001600160a01b0381166000908152600360205260408120805460019290610fea90849061196a565b909155505060008281526002602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a4610a9f565b6006546001600160a01b031633146109425760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016105b8565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b610a9f828260405180602001604052806000815250611328565b816001600160a01b0316836001600160a01b0316141561116d5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016105b8565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6111e5848484610e0d565b6111f18484848461135b565b610bce5760405162461bcd60e51b81526004016105b89061189e565b60608161123257506040805180820190915260018152600360fc1b6020820152610485565b8160005b811561125c5780611246816119e8565b91506112559050600a83611956565b9150611236565b60008167ffffffffffffffff81111561128557634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156112af576020820181803683370190505b5090505b8415610e05576112c460018361196a565b91506112d1600a86611a03565b6112dc90603061193e565b60f81b8183815181106112ff57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350611321600a86611956565b94506112b3565b6113328383611468565b61133f600084848461135b565b6106595760405162461bcd60e51b81526004016105b89061189e565b60006001600160a01b0384163b1561145d57604051630a85bd0160e11b81526001600160a01b0385169063150b7a029061139f90339089908890889060040161184e565b602060405180830381600087803b1580156113b957600080fd5b505af19250505080156113e9575060408051601f3d908101601f191682019092526113e69181019061179d565b60015b611443573d808015611417576040519150601f19603f3d011682016040523d82523d6000602084013e61141c565b606091505b50805161143b5760405162461bcd60e51b81526004016105b89061189e565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610e05565b506001949350505050565b6001600160a01b0382166114be5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016105b8565b6000818152600260205260409020546001600160a01b0316156115235760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016105b8565b6001600160a01b038216600090815260036020526040812080546001929061154c90849061193e565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a4610a9f565b80356001600160a01b038116811461048557600080fd5b6000602082840312156115d3578081fd5b610c41826115ab565b600080604083850312156115ee578081fd5b6115f7836115ab565b9150611605602084016115ab565b90509250929050565b600080600060608486031215611622578081fd5b61162b846115ab565b9250611639602085016115ab565b9150604084013590509250925092565b6000806000806080858703121561165e578081fd5b611667856115ab565b9350611675602086016115ab565b925060408501359150606085013567ffffffffffffffff80821115611698578283fd5b818701915087601f8301126116ab578283fd5b8135818111156116bd576116bd611a43565b604051601f8201601f19908116603f011681019083821181831017156116e5576116e5611a43565b816040528281528a60208487010111156116fd578586fd5b82602086016020830137918201602001949094529598949750929550505050565b60008060408385031215611730578182fd5b611739836115ab565b91506020830135801515811461174d578182fd5b809150509250929050565b6000806040838503121561176a578182fd5b611773836115ab565b946020939093013593505050565b600060208284031215611792578081fd5b8135610c4181611a59565b6000602082840312156117ae578081fd5b8151610c4181611a59565b6000602082840312156117ca578081fd5b5035919050565b600080604083850312156117e3578182fd5b82359150611605602084016115ab565b6000815180845261180b816020860160208601611981565b601f01601f19169290920160200192915050565b60008351611831818460208801611981565b835190830190611845818360208801611981565b01949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611881908301846117f3565b9695505050505050565b600060208252610c4160208301846117f3565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6020808252602e908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526d1c881b9bdc88185c1c1c9bdd995960921b606082015260800190565b6000821982111561195157611951611a17565b500190565b60008261196557611965611a2d565b500490565b60008282101561197c5761197c611a17565b500390565b60005b8381101561199c578181015183820152602001611984565b83811115610bce5750506000910152565b6002810460018216806119c157607f821691505b602082108114156119e257634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156119fc576119fc611a17565b5060010190565b600082611a1257611a12611a2d565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b031981168114610cbe57600080fdfea2646970667358221220e0ed164ca0e33913f99522366843a543a81119cef89b2336829e77ed318b995464736f6c63430008020033";

type BundleTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BundleTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BundleToken__factory extends ContractFactory {
  constructor(...args: BundleTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BundleToken> {
    return super.deploy(overrides || {}) as Promise<BundleToken>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): BundleToken {
    return super.attach(address) as BundleToken;
  }
  override connect(signer: Signer): BundleToken__factory {
    return super.connect(signer) as BundleToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BundleTokenInterface {
    return new utils.Interface(_abi) as BundleTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BundleToken {
    return new Contract(address, _abi, signerOrProvider) as BundleToken;
  }
}
