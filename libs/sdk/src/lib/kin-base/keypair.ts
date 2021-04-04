import { sign, verify } from './signing';
import * as bs58 from 'bs58';
import { StrKey } from './strkey';

import * as nacl from 'tweetnacl';

export class SimpleKeypair {
  secret: string;
  publicKey: string;
}

/**
 * `Keypair` represents public (and secret) keys of the account.
 *
 * Currently `Keypair` only supports ed25519 but in a future this class can be abstraction layer for other
 * public-key signature systems.
 *
 * Use more convenient methods to create `Keypair` object:
 * * `{@link Keypair.fromPublicKey}`
 * * `{@link Keypair.fromSecret}`
 * * `{@link Keypair.random}`
 *
 * @constructor
 * @param {object} keys At least one of keys must be provided.
 * @param {string} keys.type Public-key signature system name. (currently only `ed25519` keys are supported)
 * @param {Buffer} [keys.publicKey] Raw public key
 * @param {Buffer} [keys.secretKey] Raw secret key (32-byte secret seed in ed25519`)
 */
export class Keypair {
  private readonly type: any;
  private readonly _secretSeed: any;
  private readonly _secretKey: Buffer;
  private readonly _publicKey: Buffer;

  constructor(keys) {
    if (keys.type != 'ed25519') {
      throw new Error('Invalid keys type');
    }

    this.type = keys.type;

    if (keys.secretKey) {
      keys.secretKey = Buffer.from(keys.secretKey);

      if (keys.secretKey.length != 32) {
        throw new Error('secretKey length is invalid');
      }

      const secretKeyUint8 = new Uint8Array(keys.secretKey);
      const naclKeys = nacl.sign.keyPair.fromSeed(secretKeyUint8);

      this._secretSeed = keys.secretKey;
      this._secretKey = Buffer.from(naclKeys.secretKey);
      this._publicKey = Buffer.from(naclKeys.publicKey);

      if (
        keys.publicKey &&
        !this._publicKey.equals(Buffer.from(keys.publicKey))
      ) {
        throw new Error('secretKey does not match publicKey');
      }
    } else {
      this._publicKey = Buffer.from(keys.publicKey);

      if (this._publicKey.length != 32) {
        throw new Error('publicKey length is invalid');
      }
    }
  }

  /**
   * Creates a new `Keypair` instance from secret. This can either be secret key or secret seed depending
   * on underlying public-key signature system. Currently `Keypair` only supports ed25519.
   * @param {string} secret secret key (ex. `SDAKFNYEIAORZKKCYRILFQKLLOCNPL5SWJ3YY5NM3ZH6GJSZGXHZEPQS`)
   * @returns {Keypair}
   */
  static fromSecretKeypair(secret) {
    const rawSecret = StrKey.decodeEd25519SecretSeed(secret);
    return this.fromRawEd25519Seed(rawSecret);
  }

  static fromSecret(secret): SimpleKeypair {
    const rawSecret = StrKey.decodeEd25519SecretSeed(secret);
    const keypair = this.fromRawEd25519Seed(rawSecret);

    return {
      secret: keypair.secret(),
      publicKey: bs58.encode(keypair._publicKey),
    };
  }

  /**
   * Creates a new `Keypair` object from ed25519 secret key seed raw bytes.
   *
   * @param {Buffer} rawSeed Raw 32-byte ed25519 secret key seed
   * @returns {Keypair}
   */
  static fromRawEd25519Seed(rawSeed) {
    return new this({ type: 'ed25519', secretKey: rawSeed });
  }

  /**
   * Creates a new `Keypair` object from public key.
   * @param {string} publicKey public key (ex. `GB3KJPLFUYN5VL6R3GU3EGCGVCKFDSD7BEDX42HWG5BWFKB3KQGJJRMA`)
   * @returns {Keypair}
   */
  static fromPublicKey(publicKey) {
    publicKey = StrKey.decodeEd25519PublicKey(publicKey);
    if (publicKey.length !== 32) {
      throw new Error('Invalid Stellar public key');
    }
    return new this({ type: 'ed25519', publicKey });
  }

  /**
   * Create a random `Keypair` object.
   * @returns {Keypair}
   */
  static random() {
    let secret = nacl.randomBytes(32);
    return this.fromRawEd25519Seed(secret);
  }

  /**
   * Create a random `Keypair` object.
   * @returns {Keypair}
   */
  static randomKeys(): SimpleKeypair {
    const secret = nacl.randomBytes(32);
    const keypair = this.fromRawEd25519Seed(secret);
    return {
      secret: keypair.secret(),
      publicKey: bs58.encode(keypair._publicKey),
    };
  }

  /**
   * Returns raw public key
   * @returns {Buffer}
   */
  rawPublicKey() {
    return this._publicKey;
  }

  /**
   * Returns public key associated with this `Keypair` object.
   * @returns {string}
   */
  publicKey() {
    return StrKey.encodeEd25519PublicKey(this._publicKey);
  }

  /**
   * Returns secret key associated with this `Keypair` object
   * @returns {string}
   */
  secret() {
    if (!this._secretSeed) {
      throw new Error('no secret key available');
    }

    if (this.type == 'ed25519') {
      return StrKey.encodeEd25519SecretSeed(this._secretSeed);
    }

    throw new Error('Invalid Keypair type');
  }

  /**
   * Returns raw secret key.
   * @returns {Buffer}
   */
  rawSecretKey() {
    return this._secretSeed;
  }

  /**
   * Returns `true` if this `Keypair` object contains secret key and can sign.
   * @returns {boolean}
   */
  canSign() {
    return !!this._secretKey;
  }

  /**
   * Signs data.
   * @param {Buffer} data Data to sign
   * @returns {Buffer}
   */
  sign(data) {
    if (!this.canSign()) {
      throw new Error('cannot sign: no secret key available');
    }

    return sign(data, this._secretKey);
  }

  /**
   * Verifies if `signature` for `data` is valid.
   * @param {Buffer} data Signed data
   * @param {Buffer} signature Signature
   * @returns {boolean}
   */
  verify(data, signature) {
    return verify(data, signature, this._publicKey);
  }
}
