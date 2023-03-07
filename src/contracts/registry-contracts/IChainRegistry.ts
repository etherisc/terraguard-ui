/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace IChainRegistry {
  export type NftInfoStruct = {
    id: PromiseOrValue<BigNumberish>;
    chain: PromiseOrValue<BytesLike>;
    t: PromiseOrValue<BigNumberish>;
    state: PromiseOrValue<BigNumberish>;
    data: PromiseOrValue<BytesLike>;
    mintedIn: PromiseOrValue<BigNumberish>;
    updatedIn: PromiseOrValue<BigNumberish>;
    version: PromiseOrValue<BigNumberish>;
  };

  export type NftInfoStructOutput = [
    BigNumber,
    string,
    number,
    number,
    string,
    number,
    number,
    number
  ] & {
    id: BigNumber;
    chain: string;
    t: number;
    state: number;
    data: string;
    mintedIn: number;
    updatedIn: number;
    version: number;
  };
}

export interface IChainRegistryInterface extends utils.Interface {
  functions: {
    "blockNumber()": FunctionFragment;
    "chains()": FunctionFragment;
    "decodeBundleData(uint256)": FunctionFragment;
    "decodeComponentData(uint256)": FunctionFragment;
    "decodeInstanceData(uint256)": FunctionFragment;
    "decodeTokenData(uint256)": FunctionFragment;
    "exists(uint256)": FunctionFragment;
    "getBundleNftId(bytes32,uint256)": FunctionFragment;
    "getChainId(uint256)": FunctionFragment;
    "getComponentNftId(bytes32,uint256)": FunctionFragment;
    "getInstanceServiceFacade(bytes32)": FunctionFragment;
    "getNftId(bytes5,uint8,uint256)": FunctionFragment;
    "getNftId(bytes5)": FunctionFragment;
    "getNftId(bytes5,address)": FunctionFragment;
    "getNftId(bytes32)": FunctionFragment;
    "getNftInfo(uint256)": FunctionFragment;
    "intToBytes(uint256,uint8)": FunctionFragment;
    "objects(bytes5,uint8)": FunctionFragment;
    "probeInstance(address)": FunctionFragment;
    "registerBundle(bytes32,uint256,uint256,string,uint256)": FunctionFragment;
    "registerChain(bytes5)": FunctionFragment;
    "registerComponent(bytes32,uint256)": FunctionFragment;
    "registerInstance(address,string)": FunctionFragment;
    "registerRegistry(bytes5,address)": FunctionFragment;
    "registerStake(uint256,address)": FunctionFragment;
    "registerToken(bytes5,address)": FunctionFragment;
    "toChain(uint256)": FunctionFragment;
    "toInt(bytes5)": FunctionFragment;
    "toInt(uint32)": FunctionFragment;
    "toInt(uint40)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "blockNumber"
      | "chains"
      | "decodeBundleData"
      | "decodeComponentData"
      | "decodeInstanceData"
      | "decodeTokenData"
      | "exists"
      | "getBundleNftId"
      | "getChainId"
      | "getComponentNftId"
      | "getInstanceServiceFacade"
      | "getNftId(bytes5,uint8,uint256)"
      | "getNftId(bytes5)"
      | "getNftId(bytes5,address)"
      | "getNftId(bytes32)"
      | "getNftInfo"
      | "intToBytes"
      | "objects"
      | "probeInstance"
      | "registerBundle"
      | "registerChain"
      | "registerComponent"
      | "registerInstance"
      | "registerRegistry"
      | "registerStake"
      | "registerToken"
      | "toChain"
      | "toInt(bytes5)"
      | "toInt(uint32)"
      | "toInt(uint40)"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "blockNumber",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "chains", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decodeBundleData",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "decodeComponentData",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "decodeInstanceData",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "decodeTokenData",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "exists",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getBundleNftId",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getChainId",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getComponentNftId",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getInstanceServiceFacade",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getNftId(bytes5,uint8,uint256)",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getNftId(bytes5)",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getNftId(bytes5,address)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getNftId(bytes32)",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getNftInfo",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "intToBytes",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "objects",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "probeInstance",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerBundle",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "registerChain",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerComponent",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerInstance",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerRegistry",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerStake",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerToken",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "toChain",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "toInt(bytes5)",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "toInt(uint32)",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "toInt(uint40)",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "blockNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "chains", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decodeBundleData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decodeComponentData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decodeInstanceData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decodeTokenData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "exists", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getBundleNftId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getChainId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getComponentNftId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInstanceServiceFacade",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNftId(bytes5,uint8,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNftId(bytes5)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNftId(bytes5,address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNftId(bytes32)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getNftInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "intToBytes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "objects", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "probeInstance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerBundle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerChain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerComponent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerInstance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerStake",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "toChain", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "toInt(bytes5)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "toInt(uint32)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "toInt(uint40)",
    data: BytesLike
  ): Result;

  events: {
    "LogChainRegistryObjectRegistered(uint256,bytes5,uint8,uint8,address)": EventFragment;
  };

  getEvent(
    nameOrSignatureOrTopic: "LogChainRegistryObjectRegistered"
  ): EventFragment;
}

export interface LogChainRegistryObjectRegisteredEventObject {
  id: BigNumber;
  chain: string;
  t: number;
  state: number;
  to: string;
}
export type LogChainRegistryObjectRegisteredEvent = TypedEvent<
  [BigNumber, string, number, number, string],
  LogChainRegistryObjectRegisteredEventObject
>;

export type LogChainRegistryObjectRegisteredEventFilter =
  TypedEventFilter<LogChainRegistryObjectRegisteredEvent>;

export interface IChainRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IChainRegistryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    blockNumber(overrides?: CallOverrides): Promise<[number]>;

    chains(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { numberOfChains: BigNumber }>;

    decodeBundleData(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, string, string] & {
        instanceId: string;
        riskpoolId: BigNumber;
        bundleId: BigNumber;
        token: string;
        displayName: string;
      }
    >;

    decodeComponentData(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string] & {
        instanceId: string;
        componentId: BigNumber;
        token: string;
      }
    >;

    decodeInstanceData(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string] & {
        instanceId: string;
        registry: string;
        displayName: string;
      }
    >;

    decodeTokenData(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { token: string }>;

    exists(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getBundleNftId(
      instanceId: PromiseOrValue<BytesLike>,
      bundleId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { id: BigNumber }>;

    getChainId(
      idx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { chain: string }>;

    getComponentNftId(
      instanceId: PromiseOrValue<BytesLike>,
      componentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { id: BigNumber }>;

    getInstanceServiceFacade(
      instanceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string] & { instanceService: string }>;

    "getNftId(bytes5,uint8,uint256)"(
      chain: PromiseOrValue<BytesLike>,
      t: PromiseOrValue<BigNumberish>,
      idx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { id: BigNumber }>;

    "getNftId(bytes5)"(
      chain: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { id: BigNumber }>;

    "getNftId(bytes5,address)"(
      chain: PromiseOrValue<BytesLike>,
      implementation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { id: BigNumber }>;

    "getNftId(bytes32)"(
      instanceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { id: BigNumber }>;

    getNftInfo(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[IChainRegistry.NftInfoStructOutput]>;

    intToBytes(
      x: PromiseOrValue<BigNumberish>,
      shift: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    objects(
      chain: PromiseOrValue<BytesLike>,
      t: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { numberOfObjects: BigNumber }>;

    probeInstance(
      registry: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [boolean, BigNumber, string, string, boolean, string] & {
        isContract: boolean;
        contractSize: BigNumber;
        chain: string;
        istanceId: string;
        isValidId: boolean;
        instanceService: string;
      }
    >;

    registerBundle(
      instanceId: PromiseOrValue<BytesLike>,
      riskpoolId: PromiseOrValue<BigNumberish>,
      bundleId: PromiseOrValue<BigNumberish>,
      displayName: PromiseOrValue<string>,
      expiryAt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerChain(
      chain: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerComponent(
      instanceId: PromiseOrValue<BytesLike>,
      componentId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerInstance(
      instanceRegistry: PromiseOrValue<string>,
      displayName: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerRegistry(
      chain: PromiseOrValue<BytesLike>,
      registry: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerStake(
      target: PromiseOrValue<BigNumberish>,
      staker: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerToken(
      chain: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    toChain(
      chainId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "toInt(bytes5)"(
      x: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "toInt(uint32)"(
      x: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "toInt(uint40)"(
      x: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  blockNumber(overrides?: CallOverrides): Promise<number>;

  chains(overrides?: CallOverrides): Promise<BigNumber>;

  decodeBundleData(
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, BigNumber, string, string] & {
      instanceId: string;
      riskpoolId: BigNumber;
      bundleId: BigNumber;
      token: string;
      displayName: string;
    }
  >;

  decodeComponentData(
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, string] & {
      instanceId: string;
      componentId: BigNumber;
      token: string;
    }
  >;

  decodeInstanceData(
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string] & {
      instanceId: string;
      registry: string;
      displayName: string;
    }
  >;

  decodeTokenData(
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  exists(
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getBundleNftId(
    instanceId: PromiseOrValue<BytesLike>,
    bundleId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getChainId(
    idx: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getComponentNftId(
    instanceId: PromiseOrValue<BytesLike>,
    componentId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getInstanceServiceFacade(
    instanceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  "getNftId(bytes5,uint8,uint256)"(
    chain: PromiseOrValue<BytesLike>,
    t: PromiseOrValue<BigNumberish>,
    idx: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getNftId(bytes5)"(
    chain: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getNftId(bytes5,address)"(
    chain: PromiseOrValue<BytesLike>,
    implementation: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getNftId(bytes32)"(
    instanceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getNftInfo(
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IChainRegistry.NftInfoStructOutput>;

  intToBytes(
    x: PromiseOrValue<BigNumberish>,
    shift: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  objects(
    chain: PromiseOrValue<BytesLike>,
    t: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  probeInstance(
    registry: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [boolean, BigNumber, string, string, boolean, string] & {
      isContract: boolean;
      contractSize: BigNumber;
      chain: string;
      istanceId: string;
      isValidId: boolean;
      instanceService: string;
    }
  >;

  registerBundle(
    instanceId: PromiseOrValue<BytesLike>,
    riskpoolId: PromiseOrValue<BigNumberish>,
    bundleId: PromiseOrValue<BigNumberish>,
    displayName: PromiseOrValue<string>,
    expiryAt: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerChain(
    chain: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerComponent(
    instanceId: PromiseOrValue<BytesLike>,
    componentId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerInstance(
    instanceRegistry: PromiseOrValue<string>,
    displayName: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerRegistry(
    chain: PromiseOrValue<BytesLike>,
    registry: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerStake(
    target: PromiseOrValue<BigNumberish>,
    staker: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerToken(
    chain: PromiseOrValue<BytesLike>,
    token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  toChain(
    chainId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  "toInt(bytes5)"(
    x: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "toInt(uint32)"(
    x: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "toInt(uint40)"(
    x: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    blockNumber(overrides?: CallOverrides): Promise<number>;

    chains(overrides?: CallOverrides): Promise<BigNumber>;

    decodeBundleData(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, string, string] & {
        instanceId: string;
        riskpoolId: BigNumber;
        bundleId: BigNumber;
        token: string;
        displayName: string;
      }
    >;

    decodeComponentData(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string] & {
        instanceId: string;
        componentId: BigNumber;
        token: string;
      }
    >;

    decodeInstanceData(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string] & {
        instanceId: string;
        registry: string;
        displayName: string;
      }
    >;

    decodeTokenData(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    exists(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getBundleNftId(
      instanceId: PromiseOrValue<BytesLike>,
      bundleId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getChainId(
      idx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getComponentNftId(
      instanceId: PromiseOrValue<BytesLike>,
      componentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getInstanceServiceFacade(
      instanceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    "getNftId(bytes5,uint8,uint256)"(
      chain: PromiseOrValue<BytesLike>,
      t: PromiseOrValue<BigNumberish>,
      idx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getNftId(bytes5)"(
      chain: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getNftId(bytes5,address)"(
      chain: PromiseOrValue<BytesLike>,
      implementation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getNftId(bytes32)"(
      instanceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNftInfo(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IChainRegistry.NftInfoStructOutput>;

    intToBytes(
      x: PromiseOrValue<BigNumberish>,
      shift: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    objects(
      chain: PromiseOrValue<BytesLike>,
      t: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    probeInstance(
      registry: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [boolean, BigNumber, string, string, boolean, string] & {
        isContract: boolean;
        contractSize: BigNumber;
        chain: string;
        istanceId: string;
        isValidId: boolean;
        instanceService: string;
      }
    >;

    registerBundle(
      instanceId: PromiseOrValue<BytesLike>,
      riskpoolId: PromiseOrValue<BigNumberish>,
      bundleId: PromiseOrValue<BigNumberish>,
      displayName: PromiseOrValue<string>,
      expiryAt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerChain(
      chain: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerComponent(
      instanceId: PromiseOrValue<BytesLike>,
      componentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerInstance(
      instanceRegistry: PromiseOrValue<string>,
      displayName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerRegistry(
      chain: PromiseOrValue<BytesLike>,
      registry: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerStake(
      target: PromiseOrValue<BigNumberish>,
      staker: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerToken(
      chain: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    toChain(
      chainId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    "toInt(bytes5)"(
      x: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "toInt(uint32)"(
      x: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "toInt(uint40)"(
      x: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "LogChainRegistryObjectRegistered(uint256,bytes5,uint8,uint8,address)"(
      id?: null,
      chain?: null,
      t?: null,
      state?: null,
      to?: null
    ): LogChainRegistryObjectRegisteredEventFilter;
    LogChainRegistryObjectRegistered(
      id?: null,
      chain?: null,
      t?: null,
      state?: null,
      to?: null
    ): LogChainRegistryObjectRegisteredEventFilter;
  };

  estimateGas: {
    blockNumber(overrides?: CallOverrides): Promise<BigNumber>;

    chains(overrides?: CallOverrides): Promise<BigNumber>;

    decodeBundleData(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decodeComponentData(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decodeInstanceData(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decodeTokenData(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    exists(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBundleNftId(
      instanceId: PromiseOrValue<BytesLike>,
      bundleId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getChainId(
      idx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getComponentNftId(
      instanceId: PromiseOrValue<BytesLike>,
      componentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getInstanceServiceFacade(
      instanceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getNftId(bytes5,uint8,uint256)"(
      chain: PromiseOrValue<BytesLike>,
      t: PromiseOrValue<BigNumberish>,
      idx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getNftId(bytes5)"(
      chain: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getNftId(bytes5,address)"(
      chain: PromiseOrValue<BytesLike>,
      implementation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getNftId(bytes32)"(
      instanceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNftInfo(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    intToBytes(
      x: PromiseOrValue<BigNumberish>,
      shift: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    objects(
      chain: PromiseOrValue<BytesLike>,
      t: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    probeInstance(
      registry: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerBundle(
      instanceId: PromiseOrValue<BytesLike>,
      riskpoolId: PromiseOrValue<BigNumberish>,
      bundleId: PromiseOrValue<BigNumberish>,
      displayName: PromiseOrValue<string>,
      expiryAt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerChain(
      chain: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerComponent(
      instanceId: PromiseOrValue<BytesLike>,
      componentId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerInstance(
      instanceRegistry: PromiseOrValue<string>,
      displayName: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerRegistry(
      chain: PromiseOrValue<BytesLike>,
      registry: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerStake(
      target: PromiseOrValue<BigNumberish>,
      staker: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerToken(
      chain: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    toChain(
      chainId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "toInt(bytes5)"(
      x: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "toInt(uint32)"(
      x: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "toInt(uint40)"(
      x: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    blockNumber(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    chains(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decodeBundleData(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    decodeComponentData(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    decodeInstanceData(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    decodeTokenData(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    exists(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBundleNftId(
      instanceId: PromiseOrValue<BytesLike>,
      bundleId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getChainId(
      idx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getComponentNftId(
      instanceId: PromiseOrValue<BytesLike>,
      componentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getInstanceServiceFacade(
      instanceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getNftId(bytes5,uint8,uint256)"(
      chain: PromiseOrValue<BytesLike>,
      t: PromiseOrValue<BigNumberish>,
      idx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getNftId(bytes5)"(
      chain: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getNftId(bytes5,address)"(
      chain: PromiseOrValue<BytesLike>,
      implementation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getNftId(bytes32)"(
      instanceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNftInfo(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    intToBytes(
      x: PromiseOrValue<BigNumberish>,
      shift: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    objects(
      chain: PromiseOrValue<BytesLike>,
      t: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    probeInstance(
      registry: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerBundle(
      instanceId: PromiseOrValue<BytesLike>,
      riskpoolId: PromiseOrValue<BigNumberish>,
      bundleId: PromiseOrValue<BigNumberish>,
      displayName: PromiseOrValue<string>,
      expiryAt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerChain(
      chain: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerComponent(
      instanceId: PromiseOrValue<BytesLike>,
      componentId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerInstance(
      instanceRegistry: PromiseOrValue<string>,
      displayName: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerRegistry(
      chain: PromiseOrValue<BytesLike>,
      registry: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerStake(
      target: PromiseOrValue<BigNumberish>,
      staker: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerToken(
      chain: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    toChain(
      chainId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "toInt(bytes5)"(
      x: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "toInt(uint32)"(
      x: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "toInt(uint40)"(
      x: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
