// package: kin.agora.transaction.v4
// file: transaction/v4/transaction_service.proto

import * as transaction_v4_transaction_service_pb from "../../transaction/v4/transaction_service_pb";
import {grpc} from "@improbable-eng/grpc-web";

type TransactionGetServiceConfig = {
  readonly methodName: string;
  readonly service: typeof Transaction;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof transaction_v4_transaction_service_pb.GetServiceConfigRequest;
  readonly responseType: typeof transaction_v4_transaction_service_pb.GetServiceConfigResponse;
};

type TransactionGetMinimumKinVersion = {
  readonly methodName: string;
  readonly service: typeof Transaction;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof transaction_v4_transaction_service_pb.GetMinimumKinVersionRequest;
  readonly responseType: typeof transaction_v4_transaction_service_pb.GetMinimumKinVersionResponse;
};

type TransactionGetRecentBlockhash = {
  readonly methodName: string;
  readonly service: typeof Transaction;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof transaction_v4_transaction_service_pb.GetRecentBlockhashRequest;
  readonly responseType: typeof transaction_v4_transaction_service_pb.GetRecentBlockhashResponse;
};

type TransactionGetMinimumBalanceForRentExemption = {
  readonly methodName: string;
  readonly service: typeof Transaction;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof transaction_v4_transaction_service_pb.GetMinimumBalanceForRentExemptionRequest;
  readonly responseType: typeof transaction_v4_transaction_service_pb.GetMinimumBalanceForRentExemptionResponse;
};

type TransactionGetHistory = {
  readonly methodName: string;
  readonly service: typeof Transaction;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof transaction_v4_transaction_service_pb.GetHistoryRequest;
  readonly responseType: typeof transaction_v4_transaction_service_pb.GetHistoryResponse;
};

type TransactionSubmitTransaction = {
  readonly methodName: string;
  readonly service: typeof Transaction;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof transaction_v4_transaction_service_pb.SubmitTransactionRequest;
  readonly responseType: typeof transaction_v4_transaction_service_pb.SubmitTransactionResponse;
};

type TransactionGetTransaction = {
  readonly methodName: string;
  readonly service: typeof Transaction;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof transaction_v4_transaction_service_pb.GetTransactionRequest;
  readonly responseType: typeof transaction_v4_transaction_service_pb.GetTransactionResponse;
};

export class Transaction {
  static readonly serviceName: string;
  static readonly GetServiceConfig: TransactionGetServiceConfig;
  static readonly GetMinimumKinVersion: TransactionGetMinimumKinVersion;
  static readonly GetRecentBlockhash: TransactionGetRecentBlockhash;
  static readonly GetMinimumBalanceForRentExemption: TransactionGetMinimumBalanceForRentExemption;
  static readonly GetHistory: TransactionGetHistory;
  static readonly SubmitTransaction: TransactionSubmitTransaction;
  static readonly GetTransaction: TransactionGetTransaction;
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

export class TransactionClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getServiceConfig(
    requestMessage: transaction_v4_transaction_service_pb.GetServiceConfigRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: transaction_v4_transaction_service_pb.GetServiceConfigResponse|null) => void
  ): UnaryResponse;
  getServiceConfig(
    requestMessage: transaction_v4_transaction_service_pb.GetServiceConfigRequest,
    callback: (error: ServiceError|null, responseMessage: transaction_v4_transaction_service_pb.GetServiceConfigResponse|null) => void
  ): UnaryResponse;
  getMinimumKinVersion(
    requestMessage: transaction_v4_transaction_service_pb.GetMinimumKinVersionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: transaction_v4_transaction_service_pb.GetMinimumKinVersionResponse|null) => void
  ): UnaryResponse;
  getMinimumKinVersion(
    requestMessage: transaction_v4_transaction_service_pb.GetMinimumKinVersionRequest,
    callback: (error: ServiceError|null, responseMessage: transaction_v4_transaction_service_pb.GetMinimumKinVersionResponse|null) => void
  ): UnaryResponse;
  getRecentBlockhash(
    requestMessage: transaction_v4_transaction_service_pb.GetRecentBlockhashRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: transaction_v4_transaction_service_pb.GetRecentBlockhashResponse|null) => void
  ): UnaryResponse;
  getRecentBlockhash(
    requestMessage: transaction_v4_transaction_service_pb.GetRecentBlockhashRequest,
    callback: (error: ServiceError|null, responseMessage: transaction_v4_transaction_service_pb.GetRecentBlockhashResponse|null) => void
  ): UnaryResponse;
  getMinimumBalanceForRentExemption(
    requestMessage: transaction_v4_transaction_service_pb.GetMinimumBalanceForRentExemptionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: transaction_v4_transaction_service_pb.GetMinimumBalanceForRentExemptionResponse|null) => void
  ): UnaryResponse;
  getMinimumBalanceForRentExemption(
    requestMessage: transaction_v4_transaction_service_pb.GetMinimumBalanceForRentExemptionRequest,
    callback: (error: ServiceError|null, responseMessage: transaction_v4_transaction_service_pb.GetMinimumBalanceForRentExemptionResponse|null) => void
  ): UnaryResponse;
  getHistory(
    requestMessage: transaction_v4_transaction_service_pb.GetHistoryRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: transaction_v4_transaction_service_pb.GetHistoryResponse|null) => void
  ): UnaryResponse;
  getHistory(
    requestMessage: transaction_v4_transaction_service_pb.GetHistoryRequest,
    callback: (error: ServiceError|null, responseMessage: transaction_v4_transaction_service_pb.GetHistoryResponse|null) => void
  ): UnaryResponse;
  submitTransaction(
    requestMessage: transaction_v4_transaction_service_pb.SubmitTransactionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: transaction_v4_transaction_service_pb.SubmitTransactionResponse|null) => void
  ): UnaryResponse;
  submitTransaction(
    requestMessage: transaction_v4_transaction_service_pb.SubmitTransactionRequest,
    callback: (error: ServiceError|null, responseMessage: transaction_v4_transaction_service_pb.SubmitTransactionResponse|null) => void
  ): UnaryResponse;
  getTransaction(
    requestMessage: transaction_v4_transaction_service_pb.GetTransactionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: transaction_v4_transaction_service_pb.GetTransactionResponse|null) => void
  ): UnaryResponse;
  getTransaction(
    requestMessage: transaction_v4_transaction_service_pb.GetTransactionRequest,
    callback: (error: ServiceError|null, responseMessage: transaction_v4_transaction_service_pb.GetTransactionResponse|null) => void
  ): UnaryResponse;
}

