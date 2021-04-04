// package: kin.agora.airdrop.v4
// file: airdrop/v4/airdrop_service.proto

import * as airdrop_v4_airdrop_service_pb from "../../airdrop/v4/airdrop_service_pb";
import {grpc} from "@improbable-eng/grpc-web";

type AirdropRequestAirdrop = {
  readonly methodName: string;
  readonly service: typeof Airdrop;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof airdrop_v4_airdrop_service_pb.RequestAirdropRequest;
  readonly responseType: typeof airdrop_v4_airdrop_service_pb.RequestAirdropResponse;
};

export class Airdrop {
  static readonly serviceName: string;
  static readonly RequestAirdrop: AirdropRequestAirdrop;
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

export class AirdropClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  requestAirdrop(
    requestMessage: airdrop_v4_airdrop_service_pb.RequestAirdropRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: airdrop_v4_airdrop_service_pb.RequestAirdropResponse|null) => void
  ): UnaryResponse;
  requestAirdrop(
    requestMessage: airdrop_v4_airdrop_service_pb.RequestAirdropRequest,
    callback: (error: ServiceError|null, responseMessage: airdrop_v4_airdrop_service_pb.RequestAirdropResponse|null) => void
  ): UnaryResponse;
}

