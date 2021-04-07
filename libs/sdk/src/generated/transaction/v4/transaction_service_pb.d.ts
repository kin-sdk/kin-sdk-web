// package: kin.agora.transaction.v4
// file: transaction/v4/transaction_service.proto

import * as jspb from '@kintegrate/google-protobuf'
import * as validate_validate_pb from '../../validate/validate_pb'
import * as common_v3_model_pb from '../../common/v3/model_pb'
import * as common_v4_model_pb from '../../common/v4/model_pb'

export class GetServiceConfigRequest extends jspb.Message {
  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): GetServiceConfigRequest.AsObject
  static toObject(includeInstance: boolean, msg: GetServiceConfigRequest): GetServiceConfigRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: GetServiceConfigRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): GetServiceConfigRequest
  static deserializeBinaryFromReader(
    message: GetServiceConfigRequest,
    reader: jspb.BinaryReader,
  ): GetServiceConfigRequest
}

export namespace GetServiceConfigRequest {
  export type AsObject = {}
}

export class GetServiceConfigResponse extends jspb.Message {
  hasSubsidizerAccount(): boolean
  clearSubsidizerAccount(): void
  getSubsidizerAccount(): common_v4_model_pb.SolanaAccountId | undefined
  setSubsidizerAccount(value?: common_v4_model_pb.SolanaAccountId): void

  hasTokenProgram(): boolean
  clearTokenProgram(): void
  getTokenProgram(): common_v4_model_pb.SolanaAccountId | undefined
  setTokenProgram(value?: common_v4_model_pb.SolanaAccountId): void

  hasToken(): boolean
  clearToken(): void
  getToken(): common_v4_model_pb.SolanaAccountId | undefined
  setToken(value?: common_v4_model_pb.SolanaAccountId): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): GetServiceConfigResponse.AsObject
  static toObject(includeInstance: boolean, msg: GetServiceConfigResponse): GetServiceConfigResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: GetServiceConfigResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): GetServiceConfigResponse
  static deserializeBinaryFromReader(
    message: GetServiceConfigResponse,
    reader: jspb.BinaryReader,
  ): GetServiceConfigResponse
}

export namespace GetServiceConfigResponse {
  export type AsObject = {
    subsidizerAccount?: common_v4_model_pb.SolanaAccountId.AsObject
    tokenProgram?: common_v4_model_pb.SolanaAccountId.AsObject
    token?: common_v4_model_pb.SolanaAccountId.AsObject
  }
}

export class GetMinimumKinVersionRequest extends jspb.Message {
  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): GetMinimumKinVersionRequest.AsObject
  static toObject(includeInstance: boolean, msg: GetMinimumKinVersionRequest): GetMinimumKinVersionRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: GetMinimumKinVersionRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): GetMinimumKinVersionRequest
  static deserializeBinaryFromReader(
    message: GetMinimumKinVersionRequest,
    reader: jspb.BinaryReader,
  ): GetMinimumKinVersionRequest
}

export namespace GetMinimumKinVersionRequest {
  export type AsObject = {}
}

export class GetMinimumKinVersionResponse extends jspb.Message {
  getVersion(): number
  setVersion(value: number): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): GetMinimumKinVersionResponse.AsObject
  static toObject(includeInstance: boolean, msg: GetMinimumKinVersionResponse): GetMinimumKinVersionResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: GetMinimumKinVersionResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): GetMinimumKinVersionResponse
  static deserializeBinaryFromReader(
    message: GetMinimumKinVersionResponse,
    reader: jspb.BinaryReader,
  ): GetMinimumKinVersionResponse
}

export namespace GetMinimumKinVersionResponse {
  export type AsObject = {
    version: number
  }
}

export class GetRecentBlockhashRequest extends jspb.Message {
  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): GetRecentBlockhashRequest.AsObject
  static toObject(includeInstance: boolean, msg: GetRecentBlockhashRequest): GetRecentBlockhashRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: GetRecentBlockhashRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): GetRecentBlockhashRequest
  static deserializeBinaryFromReader(
    message: GetRecentBlockhashRequest,
    reader: jspb.BinaryReader,
  ): GetRecentBlockhashRequest
}

export namespace GetRecentBlockhashRequest {
  export type AsObject = {}
}

export class GetRecentBlockhashResponse extends jspb.Message {
  hasBlockhash(): boolean
  clearBlockhash(): void
  getBlockhash(): common_v4_model_pb.Blockhash | undefined
  setBlockhash(value?: common_v4_model_pb.Blockhash): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): GetRecentBlockhashResponse.AsObject
  static toObject(includeInstance: boolean, msg: GetRecentBlockhashResponse): GetRecentBlockhashResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: GetRecentBlockhashResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): GetRecentBlockhashResponse
  static deserializeBinaryFromReader(
    message: GetRecentBlockhashResponse,
    reader: jspb.BinaryReader,
  ): GetRecentBlockhashResponse
}

export namespace GetRecentBlockhashResponse {
  export type AsObject = {
    blockhash?: common_v4_model_pb.Blockhash.AsObject
  }
}

export class GetMinimumBalanceForRentExemptionRequest extends jspb.Message {
  getSize(): number
  setSize(value: number): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): GetMinimumBalanceForRentExemptionRequest.AsObject
  static toObject(
    includeInstance: boolean,
    msg: GetMinimumBalanceForRentExemptionRequest,
  ): GetMinimumBalanceForRentExemptionRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: GetMinimumBalanceForRentExemptionRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): GetMinimumBalanceForRentExemptionRequest
  static deserializeBinaryFromReader(
    message: GetMinimumBalanceForRentExemptionRequest,
    reader: jspb.BinaryReader,
  ): GetMinimumBalanceForRentExemptionRequest
}

export namespace GetMinimumBalanceForRentExemptionRequest {
  export type AsObject = {
    size: number
  }
}

export class GetMinimumBalanceForRentExemptionResponse extends jspb.Message {
  getLamports(): number
  setLamports(value: number): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): GetMinimumBalanceForRentExemptionResponse.AsObject
  static toObject(
    includeInstance: boolean,
    msg: GetMinimumBalanceForRentExemptionResponse,
  ): GetMinimumBalanceForRentExemptionResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: GetMinimumBalanceForRentExemptionResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): GetMinimumBalanceForRentExemptionResponse
  static deserializeBinaryFromReader(
    message: GetMinimumBalanceForRentExemptionResponse,
    reader: jspb.BinaryReader,
  ): GetMinimumBalanceForRentExemptionResponse
}

export namespace GetMinimumBalanceForRentExemptionResponse {
  export type AsObject = {
    lamports: number
  }
}

export class GetHistoryRequest extends jspb.Message {
  hasAccountId(): boolean
  clearAccountId(): void
  getAccountId(): common_v4_model_pb.SolanaAccountId | undefined
  setAccountId(value?: common_v4_model_pb.SolanaAccountId): void

  hasCursor(): boolean
  clearCursor(): void
  getCursor(): Cursor | undefined
  setCursor(value?: Cursor): void

  getDirection(): GetHistoryRequest.DirectionMap[keyof GetHistoryRequest.DirectionMap]
  setDirection(value: GetHistoryRequest.DirectionMap[keyof GetHistoryRequest.DirectionMap]): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): GetHistoryRequest.AsObject
  static toObject(includeInstance: boolean, msg: GetHistoryRequest): GetHistoryRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: GetHistoryRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): GetHistoryRequest
  static deserializeBinaryFromReader(message: GetHistoryRequest, reader: jspb.BinaryReader): GetHistoryRequest
}

export namespace GetHistoryRequest {
  export type AsObject = {
    accountId?: common_v4_model_pb.SolanaAccountId.AsObject
    cursor?: Cursor.AsObject
    direction: GetHistoryRequest.DirectionMap[keyof GetHistoryRequest.DirectionMap]
  }

  export interface DirectionMap {
    ASC: 0
    DESC: 1
  }

  export const Direction: DirectionMap
}

export class GetHistoryResponse extends jspb.Message {
  getResult(): GetHistoryResponse.ResultMap[keyof GetHistoryResponse.ResultMap]
  setResult(value: GetHistoryResponse.ResultMap[keyof GetHistoryResponse.ResultMap]): void

  clearItemsList(): void
  getItemsList(): Array<HistoryItem>
  setItemsList(value: Array<HistoryItem>): void
  addItems(value?: HistoryItem, index?: number): HistoryItem

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): GetHistoryResponse.AsObject
  static toObject(includeInstance: boolean, msg: GetHistoryResponse): GetHistoryResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: GetHistoryResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): GetHistoryResponse
  static deserializeBinaryFromReader(message: GetHistoryResponse, reader: jspb.BinaryReader): GetHistoryResponse
}

export namespace GetHistoryResponse {
  export type AsObject = {
    result: GetHistoryResponse.ResultMap[keyof GetHistoryResponse.ResultMap]
    itemsList: Array<HistoryItem.AsObject>
  }

  export interface ResultMap {
    OK: 0
    NOT_FOUND: 1
  }

  export const Result: ResultMap
}

export class SubmitTransactionRequest extends jspb.Message {
  hasTransaction(): boolean
  clearTransaction(): void
  getTransaction(): common_v4_model_pb.Transaction | undefined
  setTransaction(value?: common_v4_model_pb.Transaction): void

  hasInvoiceList(): boolean
  clearInvoiceList(): void
  getInvoiceList(): common_v3_model_pb.InvoiceList | undefined
  setInvoiceList(value?: common_v3_model_pb.InvoiceList): void

  getCommitment(): common_v4_model_pb.CommitmentMap[keyof common_v4_model_pb.CommitmentMap]
  setCommitment(value: common_v4_model_pb.CommitmentMap[keyof common_v4_model_pb.CommitmentMap]): void

  getDedupeId(): Uint8Array | string
  getDedupeId_asU8(): Uint8Array
  getDedupeId_asB64(): string
  setDedupeId(value: Uint8Array | string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): SubmitTransactionRequest.AsObject
  static toObject(includeInstance: boolean, msg: SubmitTransactionRequest): SubmitTransactionRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: SubmitTransactionRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): SubmitTransactionRequest
  static deserializeBinaryFromReader(
    message: SubmitTransactionRequest,
    reader: jspb.BinaryReader,
  ): SubmitTransactionRequest
}

export namespace SubmitTransactionRequest {
  export type AsObject = {
    transaction?: common_v4_model_pb.Transaction.AsObject
    invoiceList?: common_v3_model_pb.InvoiceList.AsObject
    commitment: common_v4_model_pb.CommitmentMap[keyof common_v4_model_pb.CommitmentMap]
    dedupeId: Uint8Array | string
  }
}

export class SubmitTransactionResponse extends jspb.Message {
  getResult(): SubmitTransactionResponse.ResultMap[keyof SubmitTransactionResponse.ResultMap]
  setResult(value: SubmitTransactionResponse.ResultMap[keyof SubmitTransactionResponse.ResultMap]): void

  hasSignature(): boolean
  clearSignature(): void
  getSignature(): common_v4_model_pb.TransactionSignature | undefined
  setSignature(value?: common_v4_model_pb.TransactionSignature): void

  hasTransactionError(): boolean
  clearTransactionError(): void
  getTransactionError(): common_v4_model_pb.TransactionError | undefined
  setTransactionError(value?: common_v4_model_pb.TransactionError): void

  clearInvoiceErrorsList(): void
  getInvoiceErrorsList(): Array<common_v3_model_pb.InvoiceError>
  setInvoiceErrorsList(value: Array<common_v3_model_pb.InvoiceError>): void
  addInvoiceErrors(value?: common_v3_model_pb.InvoiceError, index?: number): common_v3_model_pb.InvoiceError

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): SubmitTransactionResponse.AsObject
  static toObject(includeInstance: boolean, msg: SubmitTransactionResponse): SubmitTransactionResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: SubmitTransactionResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): SubmitTransactionResponse
  static deserializeBinaryFromReader(
    message: SubmitTransactionResponse,
    reader: jspb.BinaryReader,
  ): SubmitTransactionResponse
}

export namespace SubmitTransactionResponse {
  export type AsObject = {
    result: SubmitTransactionResponse.ResultMap[keyof SubmitTransactionResponse.ResultMap]
    signature?: common_v4_model_pb.TransactionSignature.AsObject
    transactionError?: common_v4_model_pb.TransactionError.AsObject
    invoiceErrorsList: Array<common_v3_model_pb.InvoiceError.AsObject>
  }

  export interface ResultMap {
    OK: 0
    ALREADY_SUBMITTED: 1
    FAILED: 2
    REJECTED: 3
    INVOICE_ERROR: 4
    PAYER_REQUIRED: 5
  }

  export const Result: ResultMap
}

export class GetTransactionRequest extends jspb.Message {
  hasTransactionId(): boolean
  clearTransactionId(): void
  getTransactionId(): common_v4_model_pb.TransactionId | undefined
  setTransactionId(value?: common_v4_model_pb.TransactionId): void

  getCommitment(): common_v4_model_pb.CommitmentMap[keyof common_v4_model_pb.CommitmentMap]
  setCommitment(value: common_v4_model_pb.CommitmentMap[keyof common_v4_model_pb.CommitmentMap]): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): GetTransactionRequest.AsObject
  static toObject(includeInstance: boolean, msg: GetTransactionRequest): GetTransactionRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: GetTransactionRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): GetTransactionRequest
  static deserializeBinaryFromReader(message: GetTransactionRequest, reader: jspb.BinaryReader): GetTransactionRequest
}

export namespace GetTransactionRequest {
  export type AsObject = {
    transactionId?: common_v4_model_pb.TransactionId.AsObject
    commitment: common_v4_model_pb.CommitmentMap[keyof common_v4_model_pb.CommitmentMap]
  }
}

export class GetTransactionResponse extends jspb.Message {
  getState(): GetTransactionResponse.StateMap[keyof GetTransactionResponse.StateMap]
  setState(value: GetTransactionResponse.StateMap[keyof GetTransactionResponse.StateMap]): void

  getSlot(): string
  setSlot(value: string): void

  getConfirmations(): number
  setConfirmations(value: number): void

  hasItem(): boolean
  clearItem(): void
  getItem(): HistoryItem | undefined
  setItem(value?: HistoryItem): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): GetTransactionResponse.AsObject
  static toObject(includeInstance: boolean, msg: GetTransactionResponse): GetTransactionResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: GetTransactionResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): GetTransactionResponse
  static deserializeBinaryFromReader(message: GetTransactionResponse, reader: jspb.BinaryReader): GetTransactionResponse
}

export namespace GetTransactionResponse {
  export type AsObject = {
    state: GetTransactionResponse.StateMap[keyof GetTransactionResponse.StateMap]
    slot: string
    confirmations: number
    item?: HistoryItem.AsObject
  }

  export interface StateMap {
    UNKNOWN: 0
    SUCCESS: 1
    FAILED: 2
    PENDING: 3
  }

  export const State: StateMap
}

export class HistoryItem extends jspb.Message {
  hasTransactionId(): boolean
  clearTransactionId(): void
  getTransactionId(): common_v4_model_pb.TransactionId | undefined
  setTransactionId(value?: common_v4_model_pb.TransactionId): void

  hasCursor(): boolean
  clearCursor(): void
  getCursor(): Cursor | undefined
  setCursor(value?: Cursor): void

  hasSolanaTransaction(): boolean
  clearSolanaTransaction(): void
  getSolanaTransaction(): common_v4_model_pb.Transaction | undefined
  setSolanaTransaction(value?: common_v4_model_pb.Transaction): void

  hasStellarTransaction(): boolean
  clearStellarTransaction(): void
  getStellarTransaction(): common_v4_model_pb.StellarTransaction | undefined
  setStellarTransaction(value?: common_v4_model_pb.StellarTransaction): void

  hasTransactionError(): boolean
  clearTransactionError(): void
  getTransactionError(): common_v4_model_pb.TransactionError | undefined
  setTransactionError(value?: common_v4_model_pb.TransactionError): void

  clearPaymentsList(): void
  getPaymentsList(): Array<HistoryItem.Payment>
  setPaymentsList(value: Array<HistoryItem.Payment>): void
  addPayments(value?: HistoryItem.Payment, index?: number): HistoryItem.Payment

  hasInvoiceList(): boolean
  clearInvoiceList(): void
  getInvoiceList(): common_v3_model_pb.InvoiceList | undefined
  setInvoiceList(value?: common_v3_model_pb.InvoiceList): void

  getRawTransactionCase(): HistoryItem.RawTransactionCase
  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): HistoryItem.AsObject
  static toObject(includeInstance: boolean, msg: HistoryItem): HistoryItem.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: HistoryItem, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): HistoryItem
  static deserializeBinaryFromReader(message: HistoryItem, reader: jspb.BinaryReader): HistoryItem
}

export namespace HistoryItem {
  export type AsObject = {
    transactionId?: common_v4_model_pb.TransactionId.AsObject
    cursor?: Cursor.AsObject
    solanaTransaction?: common_v4_model_pb.Transaction.AsObject
    stellarTransaction?: common_v4_model_pb.StellarTransaction.AsObject
    transactionError?: common_v4_model_pb.TransactionError.AsObject
    paymentsList: Array<HistoryItem.Payment.AsObject>
    invoiceList?: common_v3_model_pb.InvoiceList.AsObject
  }

  export class Payment extends jspb.Message {
    hasSource(): boolean
    clearSource(): void
    getSource(): common_v4_model_pb.SolanaAccountId | undefined
    setSource(value?: common_v4_model_pb.SolanaAccountId): void

    hasDestination(): boolean
    clearDestination(): void
    getDestination(): common_v4_model_pb.SolanaAccountId | undefined
    setDestination(value?: common_v4_model_pb.SolanaAccountId): void

    getAmount(): number
    setAmount(value: number): void

    getIndex(): number
    setIndex(value: number): void

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): Payment.AsObject
    static toObject(includeInstance: boolean, msg: Payment): Payment.AsObject
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
    static serializeBinaryToWriter(message: Payment, writer: jspb.BinaryWriter): void
    static deserializeBinary(bytes: Uint8Array): Payment
    static deserializeBinaryFromReader(message: Payment, reader: jspb.BinaryReader): Payment
  }

  export namespace Payment {
    export type AsObject = {
      source?: common_v4_model_pb.SolanaAccountId.AsObject
      destination?: common_v4_model_pb.SolanaAccountId.AsObject
      amount: number
      index: number
    }
  }

  export enum RawTransactionCase {
    RAW_TRANSACTION_NOT_SET = 0,
    SOLANA_TRANSACTION = 3,
    STELLAR_TRANSACTION = 4,
  }
}

export class Cursor extends jspb.Message {
  getValue(): Uint8Array | string
  getValue_asU8(): Uint8Array
  getValue_asB64(): string
  setValue(value: Uint8Array | string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): Cursor.AsObject
  static toObject(includeInstance: boolean, msg: Cursor): Cursor.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: Cursor, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): Cursor
  static deserializeBinaryFromReader(message: Cursor, reader: jspb.BinaryReader): Cursor
}

export namespace Cursor {
  export type AsObject = {
    value: Uint8Array | string
  }
}
