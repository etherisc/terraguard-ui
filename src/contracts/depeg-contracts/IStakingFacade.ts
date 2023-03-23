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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface IStakingFacadeInterface extends utils.Interface {
  functions: {
    "capitalSupport(uint256)": FunctionFragment;
    "getDip()": FunctionFragment;
    "getRegistry()": FunctionFragment;
    "getStakingWallet()": FunctionFragment;
    "implementsIStaking()": FunctionFragment;
    "owner()": FunctionFragment;
    "rateDecimals()": FunctionFragment;
    "rewardBalance()": FunctionFragment;
    "rewardRate()": FunctionFragment;
    "rewardReserves()": FunctionFragment;
    "setStakingRate(bytes5,address,uint256)": FunctionFragment;
    "stakingRate(bytes5,address)": FunctionFragment;
    "toChain(uint256)": FunctionFragment;
    "toRate(uint256,int8)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "capitalSupport"
      | "getDip"
      | "getRegistry"
      | "getStakingWallet"
      | "implementsIStaking"
      | "owner"
      | "rateDecimals"
      | "rewardBalance"
      | "rewardRate"
      | "rewardReserves"
      | "setStakingRate"
      | "stakingRate"
      | "toChain"
      | "toRate"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "capitalSupport",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "getDip", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getRegistry",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getStakingWallet",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "implementsIStaking",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "rateDecimals",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardReserves",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setStakingRate",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "stakingRate",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "toChain",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "toRate",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "capitalSupport",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getDip", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStakingWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "implementsIStaking",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rateDecimals",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rewardRate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rewardReserves",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setStakingRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakingRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "toChain", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "toRate", data: BytesLike): Result;

  events: {};
}

export interface IStakingFacade extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IStakingFacadeInterface;

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
    capitalSupport(
      targetNftId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { capitalAmount: BigNumber }>;

    getDip(overrides?: CallOverrides): Promise<[string]>;

    getRegistry(overrides?: CallOverrides): Promise<[string]>;

    getStakingWallet(
      overrides?: CallOverrides
    ): Promise<[string] & { stakingWallet: string }>;

    implementsIStaking(overrides?: CallOverrides): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    rateDecimals(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { decimals: BigNumber }>;

    rewardBalance(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { dipAmount: BigNumber }>;

    rewardRate(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { rate: BigNumber }>;

    rewardReserves(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { dipAmount: BigNumber }>;

    setStakingRate(
      chain: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    stakingRate(
      chain: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { rate: BigNumber }>;

    toChain(
      chainId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    toRate(
      value: PromiseOrValue<BigNumberish>,
      exp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { rate: BigNumber }>;
  };

  capitalSupport(
    targetNftId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getDip(overrides?: CallOverrides): Promise<string>;

  getRegistry(overrides?: CallOverrides): Promise<string>;

  getStakingWallet(overrides?: CallOverrides): Promise<string>;

  implementsIStaking(overrides?: CallOverrides): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  rateDecimals(overrides?: CallOverrides): Promise<BigNumber>;

  rewardBalance(overrides?: CallOverrides): Promise<BigNumber>;

  rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

  rewardReserves(overrides?: CallOverrides): Promise<BigNumber>;

  setStakingRate(
    chain: PromiseOrValue<BytesLike>,
    token: PromiseOrValue<string>,
    rate: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  stakingRate(
    chain: PromiseOrValue<BytesLike>,
    token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  toChain(
    chainId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  toRate(
    value: PromiseOrValue<BigNumberish>,
    exp: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    capitalSupport(
      targetNftId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDip(overrides?: CallOverrides): Promise<string>;

    getRegistry(overrides?: CallOverrides): Promise<string>;

    getStakingWallet(overrides?: CallOverrides): Promise<string>;

    implementsIStaking(overrides?: CallOverrides): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    rateDecimals(overrides?: CallOverrides): Promise<BigNumber>;

    rewardBalance(overrides?: CallOverrides): Promise<BigNumber>;

    rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

    rewardReserves(overrides?: CallOverrides): Promise<BigNumber>;

    setStakingRate(
      chain: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      rate: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    stakingRate(
      chain: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    toChain(
      chainId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    toRate(
      value: PromiseOrValue<BigNumberish>,
      exp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    capitalSupport(
      targetNftId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDip(overrides?: CallOverrides): Promise<BigNumber>;

    getRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    getStakingWallet(overrides?: CallOverrides): Promise<BigNumber>;

    implementsIStaking(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    rateDecimals(overrides?: CallOverrides): Promise<BigNumber>;

    rewardBalance(overrides?: CallOverrides): Promise<BigNumber>;

    rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

    rewardReserves(overrides?: CallOverrides): Promise<BigNumber>;

    setStakingRate(
      chain: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    stakingRate(
      chain: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    toChain(
      chainId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    toRate(
      value: PromiseOrValue<BigNumberish>,
      exp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    capitalSupport(
      targetNftId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDip(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getStakingWallet(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    implementsIStaking(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rateDecimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewardBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewardRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewardReserves(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setStakingRate(
      chain: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    stakingRate(
      chain: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    toChain(
      chainId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    toRate(
      value: PromiseOrValue<BigNumberish>,
      exp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
