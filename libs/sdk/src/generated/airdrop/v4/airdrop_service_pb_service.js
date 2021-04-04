// package: kin.agora.airdrop.v4
// file: airdrop/v4/airdrop_service.proto

var airdrop_v4_airdrop_service_pb = require('../../airdrop/v4/airdrop_service_pb')
var grpc = require('@improbable-eng/grpc-web').grpc

var Airdrop = (function () {
  function Airdrop() {}
  Airdrop.serviceName = 'kin.agora.airdrop.v4.Airdrop'
  return Airdrop
})()

Airdrop.RequestAirdrop = {
  methodName: 'RequestAirdrop',
  service: Airdrop,
  requestStream: false,
  responseStream: false,
  requestType: airdrop_v4_airdrop_service_pb.RequestAirdropRequest,
  responseType: airdrop_v4_airdrop_service_pb.RequestAirdropResponse,
}

exports.Airdrop = Airdrop

function AirdropClient(serviceHost, options) {
  this.serviceHost = serviceHost
  this.options = options || {}
}

AirdropClient.prototype.requestAirdrop = function requestAirdrop(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1]
  }
  var client = grpc.unary(Airdrop.RequestAirdrop, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage)
          err.code = response.status
          err.metadata = response.trailers
          callback(err, null)
        } else {
          callback(null, response.message)
        }
      }
    },
  })
  return {
    cancel: function () {
      callback = null
      client.close()
    },
  }
}

exports.AirdropClient = AirdropClient
