// package: kin.agora.transaction.v3
// file: transaction/v3/transaction_service.proto

import * as jspb from "google-protobuf";
import * as validate_validate_pb from "../../validate/validate_pb";
import * as common_v3_model_pb from "../../common/v3/model_pb";

export class GetHistoryRequest extends jspb.Message {
  hasAccountId(): boolean;
  clearAccountId(): void;
  getAccountId(): common_v3_model_pb.StellarAccountId | undefined;
  setAccountId(value?: common_v3_model_pb.StellarAccountId): void;

  hasCursor(): boolean;
  clearCursor(): void;
  getCursor(): Cursor | undefined;
  setCursor(value?: Cursor): void;

  getDirection(): GetHistoryRequest.DirectionMap[keyof GetHistoryRequest.DirectionMap];
  setDirection(value: GetHistoryRequest.DirectionMap[keyof GetHistoryRequest.DirectionMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetHistoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetHistoryRequest): GetHistoryRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetHistoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetHistoryRequest;
  static deserializeBinaryFromReader(message: GetHistoryRequest, reader: jspb.BinaryReader): GetHistoryRequest;
}

export namespace GetHistoryRequest {
  export type AsObject = {
    accountId?: common_v3_model_pb.StellarAccountId.AsObject,
    cursor?: Cursor.AsObject,
    direction: GetHistoryRequest.DirectionMap[keyof GetHistoryRequest.DirectionMap],
  }

  export interface DirectionMap {
    ASC: 0;
    DESC: 1;
  }

  export const Direction: DirectionMap;
}

export class GetHistoryResponse extends jspb.Message {
  getResult(): GetHistoryResponse.ResultMap[keyof GetHistoryResponse.ResultMap];
  setResult(value: GetHistoryResponse.ResultMap[keyof GetHistoryResponse.ResultMap]): void;

  clearItemsList(): void;
  getItemsList(): Array<HistoryItem>;
  setItemsList(value: Array<HistoryItem>): void;
  addItems(value?: HistoryItem, index?: number): HistoryItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetHistoryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetHistoryResponse): GetHistoryResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetHistoryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetHistoryResponse;
  static deserializeBinaryFromReader(message: GetHistoryResponse, reader: jspb.BinaryReader): GetHistoryResponse;
}

export namespace GetHistoryResponse {
  export type AsObject = {
    result: GetHistoryResponse.ResultMap[keyof GetHistoryResponse.ResultMap],
    itemsList: Array<HistoryItem.AsObject>,
  }

  export interface ResultMap {
    OK: 0;
    NOT_FOUND: 1;
  }

  export const Result: ResultMap;
}

export class SubmitTransactionRequest extends jspb.Message {
  getEnvelopeXdr(): Uint8Array | string;
  getEnvelopeXdr_asU8(): Uint8Array;
  getEnvelopeXdr_asB64(): string;
  setEnvelopeXdr(value: Uint8Array | string): void;

  hasInvoiceList(): boolean;
  clearInvoiceList(): void;
  getInvoiceList(): common_v3_model_pb.InvoiceList | undefined;
  setInvoiceList(value?: common_v3_model_pb.InvoiceList): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubmitTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SubmitTransactionRequest): SubmitTransactionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SubmitTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubmitTransactionRequest;
  static deserializeBinaryFromReader(message: SubmitTransactionRequest, reader: jspb.BinaryReader): SubmitTransactionRequest;
}

export namespace SubmitTransactionRequest {
  export type AsObject = {
    envelopeXdr: Uint8Array | string,
    invoiceList?: common_v3_model_pb.InvoiceList.AsObject,
  }
}

export class SubmitTransactionResponse extends jspb.Message {
  getResult(): SubmitTransactionResponse.ResultMap[keyof SubmitTransactionResponse.ResultMap];
  setResult(value: SubmitTransactionResponse.ResultMap[keyof SubmitTransactionResponse.ResultMap]): void;

  clearInvoiceErrorsList(): void;
  getInvoiceErrorsList(): Array<common_v3_model_pb.InvoiceError>;
  setInvoiceErrorsList(value: Array<common_v3_model_pb.InvoiceError>): void;
  addInvoiceErrors(value?: common_v3_model_pb.InvoiceError, index?: number): common_v3_model_pb.InvoiceError;

  hasHash(): boolean;
  clearHash(): void;
  getHash(): common_v3_model_pb.TransactionHash | undefined;
  setHash(value?: common_v3_model_pb.TransactionHash): void;

  getLedger(): string;
  setLedger(value: string): void;

  getResultXdr(): Uint8Array | string;
  getResultXdr_asU8(): Uint8Array;
  getResultXdr_asB64(): string;
  setResultXdr(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubmitTransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SubmitTransactionResponse): SubmitTransactionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SubmitTransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubmitTransactionResponse;
  static deserializeBinaryFromReader(message: SubmitTransactionResponse, reader: jspb.BinaryReader): SubmitTransactionResponse;
}

export namespace SubmitTransactionResponse {
  export type AsObject = {
    result: SubmitTransactionResponse.ResultMap[keyof SubmitTransactionResponse.ResultMap],
    invoiceErrorsList: Array<common_v3_model_pb.InvoiceError.AsObject>,
    hash?: common_v3_model_pb.TransactionHash.AsObject,
    ledger: string,
    resultXdr: Uint8Array | string,
  }

  export interface ResultMap {
    OK: 0;
    FAILED: 1;
    REJECTED: 2;
    INVOICE_ERROR: 3;
  }

  export const Result: ResultMap;
}

export class GetTransactionRequest extends jspb.Message {
  hasTransactionHash(): boolean;
  clearTransactionHash(): void;
  getTransactionHash(): common_v3_model_pb.TransactionHash | undefined;
  setTransactionHash(value?: common_v3_model_pb.TransactionHash): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionRequest): GetTransactionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionRequest;
  static deserializeBinaryFromReader(message: GetTransactionRequest, reader: jspb.BinaryReader): GetTransactionRequest;
}

export namespace GetTransactionRequest {
  export type AsObject = {
    transactionHash?: common_v3_model_pb.TransactionHash.AsObject,
  }
}

export class GetTransactionResponse extends jspb.Message {
  getState(): GetTransactionResponse.StateMap[keyof GetTransactionResponse.StateMap];
  setState(value: GetTransactionResponse.StateMap[keyof GetTransactionResponse.StateMap]): void;

  getLedger(): string;
  setLedger(value: string): void;

  hasItem(): boolean;
  clearItem(): void;
  getItem(): HistoryItem | undefined;
  setItem(value?: HistoryItem): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionResponse): GetTransactionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionResponse;
  static deserializeBinaryFromReader(message: GetTransactionResponse, reader: jspb.BinaryReader): GetTransactionResponse;
}

export namespace GetTransactionResponse {
  export type AsObject = {
    state: GetTransactionResponse.StateMap[keyof GetTransactionResponse.StateMap],
    ledger: string,
    item?: HistoryItem.AsObject,
  }

  export interface StateMap {
    UNKNOWN: 0;
    SUCCESS: 1;
  }

  export const State: StateMap;
}

export class HistoryItem extends jspb.Message {
  hasHash(): boolean;
  clearHash(): void;
  getHash(): common_v3_model_pb.TransactionHash | undefined;
  setHash(value?: common_v3_model_pb.TransactionHash): void;

  getResultXdr(): Uint8Array | string;
  getResultXdr_asU8(): Uint8Array;
  getResultXdr_asB64(): string;
  setResultXdr(value: Uint8Array | string): void;

  getEnvelopeXdr(): Uint8Array | string;
  getEnvelopeXdr_asU8(): Uint8Array;
  getEnvelopeXdr_asB64(): string;
  setEnvelopeXdr(value: Uint8Array | string): void;

  hasCursor(): boolean;
  clearCursor(): void;
  getCursor(): Cursor | undefined;
  setCursor(value?: Cursor): void;

  hasInvoiceList(): boolean;
  clearInvoiceList(): void;
  getInvoiceList(): common_v3_model_pb.InvoiceList | undefined;
  setInvoiceList(value?: common_v3_model_pb.InvoiceList): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HistoryItem.AsObject;
  static toObject(includeInstance: boolean, msg: HistoryItem): HistoryItem.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HistoryItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HistoryItem;
  static deserializeBinaryFromReader(message: HistoryItem, reader: jspb.BinaryReader): HistoryItem;
}

export namespace HistoryItem {
  export type AsObject = {
    hash?: common_v3_model_pb.TransactionHash.AsObject,
    resultXdr: Uint8Array | string,
    envelopeXdr: Uint8Array | string,
    cursor?: Cursor.AsObject,
    invoiceList?: common_v3_model_pb.InvoiceList.AsObject,
  }
}

export class Cursor extends jspb.Message {
  getValue(): Uint8Array | string;
  getValue_asU8(): Uint8Array;
  getValue_asB64(): string;
  setValue(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Cursor.AsObject;
  static toObject(includeInstance: boolean, msg: Cursor): Cursor.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Cursor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Cursor;
  static deserializeBinaryFromReader(message: Cursor, reader: jspb.BinaryReader): Cursor;
}

export namespace Cursor {
  export type AsObject = {
    value: Uint8Array | string,
  }
}

