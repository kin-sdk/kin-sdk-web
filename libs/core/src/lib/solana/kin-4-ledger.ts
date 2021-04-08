import { bs58encode } from '@kin-sdk/core'
import TransportWebUsb from '@ledgerhq/hw-transport-webusb'
import {
  solana_derivation_path,
  solana_ledger_request_pubkey,
  solana_ledger_get_pubkey,
  solana_ledger_sign_transaction,
} from './ledger-utils'

import { PublicKey, Transaction } from '@solana/web3.js'

export class Kin4Ledger {
  transport: typeof TransportWebUsb
  connected = false

  private connect = async () => {
    if (this.connected == false) {
      this.transport = await TransportWebUsb.create()
      this.transport.on('disconnect', () => {
        this.connected = false
        this.transport = undefined
      })
      this.connected = true
    }
    return this
  }

  getPublicKey = async (account: number) => {
    await this.connect()
    const path = solana_derivation_path(account, undefined)
    const keyBytes = await solana_ledger_get_pubkey(this.transport, path)
    const encoded = bs58encode(keyBytes)
    return new PublicKey(encoded)
  }

  getPublicKeyWithDisplay = async (account: number) => {
    await this.connect()
    const path = solana_derivation_path(account, undefined)
    const keyBytes = await solana_ledger_request_pubkey(this.transport, path)
    const encoded = bs58encode(keyBytes)
    return new PublicKey(encoded)
  }

  signTransaction = async (account: number, transaction: Transaction) => {
    await this.connect()
    const from_derivation_path = solana_derivation_path(account, undefined)
    const pkBytes = await solana_ledger_get_pubkey(this.transport, from_derivation_path)
    const pk = new PublicKey(bs58encode(pkBytes))
    const sig_bytes = await solana_ledger_sign_transaction(this.transport, from_derivation_path, transaction)

    transaction.addSignature(pk, sig_bytes)
    return transaction
  }
}
