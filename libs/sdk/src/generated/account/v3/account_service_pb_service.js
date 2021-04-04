// package: kin.agora.account.v3
// file: account/v3/account_service.proto

var account_v3_account_service_pb = require("../../account/v3/account_service_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Account = (function () {
  function Account() {}
  Account.serviceName = "kin.agora.account.v3.Account";
  return Account;
}());

Account.CreateAccount = {
  methodName: "CreateAccount",
  service: Account,
  requestStream: false,
  responseStream: false,
  requestType: account_v3_account_service_pb.CreateAccountRequest,
  responseType: account_v3_account_service_pb.CreateAccountResponse
};

Account.GetAccountInfo = {
  methodName: "GetAccountInfo",
  service: Account,
  requestStream: false,
  responseStream: false,
  requestType: account_v3_account_service_pb.GetAccountInfoRequest,
  responseType: account_v3_account_service_pb.GetAccountInfoResponse
};

Account.GetEvents = {
  methodName: "GetEvents",
  service: Account,
  requestStream: false,
  responseStream: true,
  requestType: account_v3_account_service_pb.GetEventsRequest,
  responseType: account_v3_account_service_pb.Events
};

exports.Account = Account;

function AccountClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

AccountClient.prototype.createAccount = function createAccount(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Account.CreateAccount, {
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

AccountClient.prototype.getAccountInfo = function getAccountInfo(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Account.GetAccountInfo, {
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

AccountClient.prototype.getEvents = function getEvents(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Account.GetEvents, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.AccountClient = AccountClient;

