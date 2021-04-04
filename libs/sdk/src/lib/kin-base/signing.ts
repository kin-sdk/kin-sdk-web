import * as nacl from 'tweetnacl';

export function sign(data, secretKey) {
  data = Buffer.from(data);
  data = new Uint8Array(data.toJSON().data);
  secretKey = new Uint8Array(secretKey.toJSON().data);

  const signature = nacl.sign.detached(data, secretKey);

  return Buffer.from(signature);
}

export function verify(data, signature, publicKey) {
  data = Buffer.from(data);
  data = new Uint8Array(data.toJSON().data);
  signature = new Uint8Array(signature.toJSON().data);
  publicKey = new Uint8Array(publicKey.toJSON().data);

  return nacl.sign.detached.verify(data, signature, publicKey);
}
