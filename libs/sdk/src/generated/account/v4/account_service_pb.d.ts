// package: kin.agora.account.v4
// file: account/v4/account_service.proto

import * as jspb from '@kintegrate/google-protobuf'
import * as validate_validate_pb from '../../validate/validate_pb'
import * as common_v4_model_pb from '../../common/v4/model_pb'

export class AccountInfo extends jspb.Message {
  hasAccountId(): boolean
  clearAccountId(): void
  getAccountId(): common_v4_model_pb.SolanaAccountId | undefined
  setAccountId(value?: common_v4_model_pb.SolanaAccountId): void

  getBalance(): string
  setBalance(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): AccountInfo.AsObject
  static toObject(includeInstance: boolean, msg: AccountInfo): AccountInfo.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: AccountInfo, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): AccountInfo
  static deserializeBinaryFromReader(message: AccountInfo, reader: jspb.BinaryReader): AccountInfo
}

export namespace AccountInfo {
  export type AsObject = {
    accountId?: common_v4_model_pb.SolanaAccountId.AsObject
    balance: string
  }
}

export class CreateAccountRequest extends jspb.Message {
  hasTransaction(): boolean
  clearTransaction(): void
  getTransaction(): common_v4_model_pb.Transaction | undefined
  setTransaction(value?: common_v4_model_pb.Transaction): void

  getCommitment(): common_v4_model_pb.CommitmentMap[keyof common_v4_model_pb.CommitmentMap]
  setCommitment(value: common_v4_model_pb.CommitmentMap[keyof common_v4_model_pb.CommitmentMap]): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): CreateAccountRequest.AsObject
  static toObject(includeInstance: boolean, msg: CreateAccountRequest): CreateAccountRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: CreateAccountRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): CreateAccountRequest
  static deserializeBinaryFromReader(message: CreateAccountRequest, reader: jspb.BinaryReader): CreateAccountRequest
}

export namespace CreateAccountRequest {
  export type AsObject = {
    transaction?: common_v4_model_pb.Transaction.AsObject
    commitment: common_v4_model_pb.CommitmentMap[keyof common_v4_model_pb.CommitmentMap]
  }
}

export class CreateAccountResponse extends jspb.Message {
  getResult(): CreateAccountResponse.ResultMap[keyof CreateAccountResponse.ResultMap]
  setResult(value: CreateAccountResponse.ResultMap[keyof CreateAccountResponse.ResultMap]): void

  hasAccountInfo(): boolean
  clearAccountInfo(): void
  getAccountInfo(): AccountInfo | undefined
  setAccountInfo(value?: AccountInfo): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): CreateAccountResponse.AsObject
  static toObject(includeInstance: boolean, msg: CreateAccountResponse): CreateAccountResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: CreateAccountResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): CreateAccountResponse
  static deserializeBinaryFromReader(message: CreateAccountResponse, reader: jspb.BinaryReader): CreateAccountResponse
}

export namespace CreateAccountResponse {
  export type AsObject = {
    result: CreateAccountResponse.ResultMap[keyof CreateAccountResponse.ResultMap]
    accountInfo?: AccountInfo.AsObject
  }

  export interface ResultMap {
    OK: 0
    EXISTS: 1
    PAYER_REQUIRED: 2
    BAD_NONCE: 3
  }

  export const Result: ResultMap
}

export class GetAccountInfoRequest extends jspb.Message {
  hasAccountId(): boolean
  clearAccountId(): void
  getAccountId(): common_v4_model_pb.SolanaAccountId | undefined
  setAccountId(value?: common_v4_model_pb.SolanaAccountId): void

  getCommitment(): common_v4_model_pb.CommitmentMap[keyof common_v4_model_pb.CommitmentMap]
  setCommitment(value: common_v4_model_pb.CommitmentMap[keyof common_v4_model_pb.CommitmentMap]): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): GetAccountInfoRequest.AsObject
  static toObject(includeInstance: boolean, msg: GetAccountInfoRequest): GetAccountInfoRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: GetAccountInfoRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): GetAccountInfoRequest
  static deserializeBinaryFromReader(message: GetAccountInfoRequest, reader: jspb.BinaryReader): GetAccountInfoRequest
}

export namespace GetAccountInfoRequest {
  export type AsObject = {
    accountId?: common_v4_model_pb.SolanaAccountId.AsObject
    commitment: common_v4_model_pb.CommitmentMap[keyof common_v4_model_pb.CommitmentMap]
  }
}

export class GetAccountInfoResponse extends jspb.Message {
  getResult(): GetAccountInfoResponse.ResultMap[keyof GetAccountInfoResponse.ResultMap]
  setResult(value: GetAccountInfoResponse.ResultMap[keyof GetAccountInfoResponse.ResultMap]): void

  hasAccountInfo(): boolean
  clearAccountInfo(): void
  getAccountInfo(): AccountInfo | undefined
  setAccountInfo(value?: AccountInfo): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): GetAccountInfoResponse.AsObject
  static toObject(includeInstance: boolean, msg: GetAccountInfoResponse): GetAccountInfoResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: GetAccountInfoResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): GetAccountInfoResponse
  static deserializeBinaryFromReader(message: GetAccountInfoResponse, reader: jspb.BinaryReader): GetAccountInfoResponse
}

export namespace GetAccountInfoResponse {
  export type AsObject = {
    result: GetAccountInfoResponse.ResultMap[keyof GetAccountInfoResponse.ResultMap]
    accountInfo?: AccountInfo.AsObject
  }

  export interface ResultMap {
    OK: 0
    NOT_FOUND: 1
  }

  export const Result: ResultMap
}

export class ResolveTokenAccountsRequest extends jspb.Message {
  hasAccountId(): boolean
  clearAccountId(): void
  getAccountId(): common_v4_model_pb.SolanaAccountId | undefined
  setAccountId(value?: common_v4_model_pb.SolanaAccountId): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): ResolveTokenAccountsRequest.AsObject
  static toObject(includeInstance: boolean, msg: ResolveTokenAccountsRequest): ResolveTokenAccountsRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: ResolveTokenAccountsRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): ResolveTokenAccountsRequest
  static deserializeBinaryFromReader(
    message: ResolveTokenAccountsRequest,
    reader: jspb.BinaryReader,
  ): ResolveTokenAccountsRequest
}

export namespace ResolveTokenAccountsRequest {
  export type AsObject = {
    accountId?: common_v4_model_pb.SolanaAccountId.AsObject
  }
}

export class ResolveTokenAccountsResponse extends jspb.Message {
  clearTokenAccountsList(): void
  getTokenAccountsList(): Array<common_v4_model_pb.SolanaAccountId>
  setTokenAccountsList(value: Array<common_v4_model_pb.SolanaAccountId>): void
  addTokenAccounts(value?: common_v4_model_pb.SolanaAccountId, index?: number): common_v4_model_pb.SolanaAccountId

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): ResolveTokenAccountsResponse.AsObject
  static toObject(includeInstance: boolean, msg: ResolveTokenAccountsResponse): ResolveTokenAccountsResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: ResolveTokenAccountsResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): ResolveTokenAccountsResponse
  static deserializeBinaryFromReader(
    message: ResolveTokenAccountsResponse,
    reader: jspb.BinaryReader,
  ): ResolveTokenAccountsResponse
}

export namespace ResolveTokenAccountsResponse {
  export type AsObject = {
    tokenAccountsList: Array<common_v4_model_pb.SolanaAccountId.AsObject>
  }
}

export class GetEventsRequest extends jspb.Message {
  hasAccountId(): boolean
  clearAccountId(): void
  getAccountId(): common_v4_model_pb.SolanaAccountId | undefined
  setAccountId(value?: common_v4_model_pb.SolanaAccountId): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): GetEventsRequest.AsObject
  static toObject(includeInstance: boolean, msg: GetEventsRequest): GetEventsRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: GetEventsRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): GetEventsRequest
  static deserializeBinaryFromReader(message: GetEventsRequest, reader: jspb.BinaryReader): GetEventsRequest
}

export namespace GetEventsRequest {
  export type AsObject = {
    accountId?: common_v4_model_pb.SolanaAccountId.AsObject
  }
}

export class Events extends jspb.Message {
  getResult(): Events.ResultMap[keyof Events.ResultMap]
  setResult(value: Events.ResultMap[keyof Events.ResultMap]): void

  clearEventsList(): void
  getEventsList(): Array<Event>
  setEventsList(value: Array<Event>): void
  addEvents(value?: Event, index?: number): Event

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): Events.AsObject
  static toObject(includeInstance: boolean, msg: Events): Events.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: Events, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): Events
  static deserializeBinaryFromReader(message: Events, reader: jspb.BinaryReader): Events
}

export namespace Events {
  export type AsObject = {
    result: Events.ResultMap[keyof Events.ResultMap]
    eventsList: Array<Event.AsObject>
  }

  export interface ResultMap {
    OK: 0
    NOT_FOUND: 1
  }

  export const Result: ResultMap
}

export class Event extends jspb.Message {
  hasAccountUpdateEvent(): boolean
  clearAccountUpdateEvent(): void
  getAccountUpdateEvent(): AccountUpdateEvent | undefined
  setAccountUpdateEvent(value?: AccountUpdateEvent): void

  hasTransactionEvent(): boolean
  clearTransactionEvent(): void
  getTransactionEvent(): TransactionEvent | undefined
  setTransactionEvent(value?: TransactionEvent): void

  getTypeCase(): Event.TypeCase
  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): Event.AsObject
  static toObject(includeInstance: boolean, msg: Event): Event.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): Event
  static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event
}

export namespace Event {
  export type AsObject = {
    accountUpdateEvent?: AccountUpdateEvent.AsObject
    transactionEvent?: TransactionEvent.AsObject
  }

  export enum TypeCase {
    TYPE_NOT_SET = 0,
    ACCOUNT_UPDATE_EVENT = 1,
    TRANSACTION_EVENT = 2,
  }
}

export class AccountUpdateEvent extends jspb.Message {
  hasAccountInfo(): boolean
  clearAccountInfo(): void
  getAccountInfo(): AccountInfo | undefined
  setAccountInfo(value?: AccountInfo): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): AccountUpdateEvent.AsObject
  static toObject(includeInstance: boolean, msg: AccountUpdateEvent): AccountUpdateEvent.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: AccountUpdateEvent, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): AccountUpdateEvent
  static deserializeBinaryFromReader(message: AccountUpdateEvent, reader: jspb.BinaryReader): AccountUpdateEvent
}

export namespace AccountUpdateEvent {
  export type AsObject = {
    accountInfo?: AccountInfo.AsObject
  }
}

export class TransactionEvent extends jspb.Message {
  hasTransaction(): boolean
  clearTransaction(): void
  getTransaction(): common_v4_model_pb.Transaction | undefined
  setTransaction(value?: common_v4_model_pb.Transaction): void

  hasTransactionError(): boolean
  clearTransactionError(): void
  getTransactionError(): common_v4_model_pb.TransactionError | undefined
  setTransactionError(value?: common_v4_model_pb.TransactionError): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): TransactionEvent.AsObject
  static toObject(includeInstance: boolean, msg: TransactionEvent): TransactionEvent.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: TransactionEvent, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): TransactionEvent
  static deserializeBinaryFromReader(message: TransactionEvent, reader: jspb.BinaryReader): TransactionEvent
}

export namespace TransactionEvent {
  export type AsObject = {
    transaction?: common_v4_model_pb.Transaction.AsObject
    transactionError?: common_v4_model_pb.TransactionError.AsObject
  }
}
