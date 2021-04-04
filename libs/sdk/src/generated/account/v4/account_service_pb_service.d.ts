// package: kin.agora.account.v4
// file: account/v4/account_service.proto

import * as account_v4_account_service_pb from "../../account/v4/account_service_pb";
import {grpc} from "@improbable-eng/grpc-web";

type AccountCreateAccount = {
  readonly methodName: string;
  readonly service: typeof Account;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof account_v4_account_service_pb.CreateAccountRequest;
  readonly responseType: typeof account_v4_account_service_pb.CreateAccountResponse;
};

type AccountGetAccountInfo = {
  readonly methodName: string;
  readonly service: typeof Account;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof account_v4_account_service_pb.GetAccountInfoRequest;
  readonly responseType: typeof account_v4_account_service_pb.GetAccountInfoResponse;
};

type AccountResolveTokenAccounts = {
  readonly methodName: string;
  readonly service: typeof Account;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof account_v4_account_service_pb.ResolveTokenAccountsRequest;
  readonly responseType: typeof account_v4_account_service_pb.ResolveTokenAccountsResponse;
};

type AccountGetEvents = {
  readonly methodName: string;
  readonly service: typeof Account;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof account_v4_account_service_pb.GetEventsRequest;
  readonly responseType: typeof account_v4_account_service_pb.Events;
};

export class Account {
  static readonly serviceName: string;
  static readonly CreateAccount: AccountCreateAccount;
  static readonly GetAccountInfo: AccountGetAccountInfo;
  static readonly ResolveTokenAccounts: AccountResolveTokenAccounts;
  static readonly GetEvents: AccountGetEvents;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class AccountClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  createAccount(
    requestMessage: account_v4_account_service_pb.CreateAccountRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: account_v4_account_service_pb.CreateAccountResponse|null) => void
  ): UnaryResponse;
  createAccount(
    requestMessage: account_v4_account_service_pb.CreateAccountRequest,
    callback: (error: ServiceError|null, responseMessage: account_v4_account_service_pb.CreateAccountResponse|null) => void
  ): UnaryResponse;
  getAccountInfo(
    requestMessage: account_v4_account_service_pb.GetAccountInfoRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: account_v4_account_service_pb.GetAccountInfoResponse|null) => void
  ): UnaryResponse;
  getAccountInfo(
    requestMessage: account_v4_account_service_pb.GetAccountInfoRequest,
    callback: (error: ServiceError|null, responseMessage: account_v4_account_service_pb.GetAccountInfoResponse|null) => void
  ): UnaryResponse;
  resolveTokenAccounts(
    requestMessage: account_v4_account_service_pb.ResolveTokenAccountsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: account_v4_account_service_pb.ResolveTokenAccountsResponse|null) => void
  ): UnaryResponse;
  resolveTokenAccounts(
    requestMessage: account_v4_account_service_pb.ResolveTokenAccountsRequest,
    callback: (error: ServiceError|null, responseMessage: account_v4_account_service_pb.ResolveTokenAccountsResponse|null) => void
  ): UnaryResponse;
  getEvents(requestMessage: account_v4_account_service_pb.GetEventsRequest, metadata?: grpc.Metadata): ResponseStream<account_v4_account_service_pb.Events>;
}

