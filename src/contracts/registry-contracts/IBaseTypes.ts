/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
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

export interface IBaseTypesInterface extends utils.Interface {
  functions: {
    "blockNumber()": FunctionFragment;
    "intToBytes(uint256,uint8)": FunctionFragment;
    "toInt(bytes5)": FunctionFragment;
    "toInt(uint32)": FunctionFragment;
    "toInt(uint40)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "blockNumber"
      | "intToBytes"
      | "toInt(bytes5)"
      | "toInt(uint32)"
      | "toInt(uint40)"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "blockNumber",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "intToBytes",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
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
  decodeFunctionResult(functionFragment: "intToBytes", data: BytesLike): Result;
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

  events: {};
}

export interface IBaseTypes extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IBaseTypesInterface;

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

    intToBytes(
      x: PromiseOrValue<BigNumberish>,
      shift: PromiseOrValue<BigNumberish>,
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

  intToBytes(
    x: PromiseOrValue<BigNumberish>,
    shift: PromiseOrValue<BigNumberish>,
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

    intToBytes(
      x: PromiseOrValue<BigNumberish>,
      shift: PromiseOrValue<BigNumberish>,
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

  filters: {};

  estimateGas: {
    blockNumber(overrides?: CallOverrides): Promise<BigNumber>;

    intToBytes(
      x: PromiseOrValue<BigNumberish>,
      shift: PromiseOrValue<BigNumberish>,
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

    intToBytes(
      x: PromiseOrValue<BigNumberish>,
      shift: PromiseOrValue<BigNumberish>,
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
