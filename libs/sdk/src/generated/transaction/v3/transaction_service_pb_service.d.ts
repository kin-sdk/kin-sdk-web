// package: kin.agora.transaction.v3
// file: transaction/v3/transaction_service.proto

import * as transaction_v3_transaction_service_pb from "../../transaction/v3/transaction_service_pb";
import {grpc} from "@improbable-eng/grpc-web";

type TransactionGetHistory = {
  readonly methodName: string;
  readonly service: typeof Transaction;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof transaction_v3_transaction_service_pb.GetHistoryRequest;
  readonly responseType: typeof transaction_v3_transaction_service_pb.GetHistoryResponse;
};

type TransactionSubmitTransaction = {
  readonly methodName: string;
  readonly service: typeof Transaction;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof transaction_v3_transaction_service_pb.SubmitTransactionRequest;
  readonly responseType: typeof transaction_v3_transaction_service_pb.SubmitTransactionResponse;
};

type TransactionGetTransaction = {
  readonly methodName: string;
  readonly service: typeof Transaction;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof transaction_v3_transaction_service_pb.GetTransactionRequest;
  readonly responseType: typeof transaction_v3_transaction_service_pb.GetTransactionResponse;
};

export class Transaction {
  static readonly serviceName: string;
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
  getHistory(
    requestMessage: transaction_v3_transaction_service_pb.GetHistoryRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: transaction_v3_transaction_service_pb.GetHistoryResponse|null) => void
  ): UnaryResponse;
  getHistory(
    requestMessage: transaction_v3_transaction_service_pb.GetHistoryRequest,
    callback: (error: ServiceError|null, responseMessage: transaction_v3_transaction_service_pb.GetHistoryResponse|null) => void
  ): UnaryResponse;
  submitTransaction(
    requestMessage: transaction_v3_transaction_service_pb.SubmitTransactionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: transaction_v3_transaction_service_pb.SubmitTransactionResponse|null) => void
  ): UnaryResponse;
  submitTransaction(
    requestMessage: transaction_v3_transaction_service_pb.SubmitTransactionRequest,
    callback: (error: ServiceError|null, responseMessage: transaction_v3_transaction_service_pb.SubmitTransactionResponse|null) => void
  ): UnaryResponse;
  getTransaction(
    requestMessage: transaction_v3_transaction_service_pb.GetTransactionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: transaction_v3_transaction_service_pb.GetTransactionResponse|null) => void
  ): UnaryResponse;
  getTransaction(
    requestMessage: transaction_v3_transaction_service_pb.GetTransactionRequest,
    callback: (error: ServiceError|null, responseMessage: transaction_v3_transaction_service_pb.GetTransactionResponse|null) => void
  ): UnaryResponse;
}

