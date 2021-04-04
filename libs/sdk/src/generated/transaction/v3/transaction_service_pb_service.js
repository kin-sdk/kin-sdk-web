// package: kin.agora.transaction.v3
// file: transaction/v3/transaction_service.proto

var transaction_v3_transaction_service_pb = require("../../transaction/v3/transaction_service_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Transaction = (function () {
  function Transaction() {}
  Transaction.serviceName = "kin.agora.transaction.v3.Transaction";
  return Transaction;
}());

Transaction.GetHistory = {
  methodName: "GetHistory",
  service: Transaction,
  requestStream: false,
  responseStream: false,
  requestType: transaction_v3_transaction_service_pb.GetHistoryRequest,
  responseType: transaction_v3_transaction_service_pb.GetHistoryResponse
};

Transaction.SubmitTransaction = {
  methodName: "SubmitTransaction",
  service: Transaction,
  requestStream: false,
  responseStream: false,
  requestType: transaction_v3_transaction_service_pb.SubmitTransactionRequest,
  responseType: transaction_v3_transaction_service_pb.SubmitTransactionResponse
};

Transaction.GetTransaction = {
  methodName: "GetTransaction",
  service: Transaction,
  requestStream: false,
  responseStream: false,
  requestType: transaction_v3_transaction_service_pb.GetTransactionRequest,
  responseType: transaction_v3_transaction_service_pb.GetTransactionResponse
};

exports.Transaction = Transaction;

function TransactionClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TransactionClient.prototype.getHistory = function getHistory(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Transaction.GetHistory, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TransactionClient.prototype.submitTransaction = function submitTransaction(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Transaction.SubmitTransaction, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TransactionClient.prototype.getTransaction = function getTransaction(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Transaction.GetTransaction, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.TransactionClient = TransactionClient;

