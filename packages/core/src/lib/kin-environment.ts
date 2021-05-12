import { Network } from './interfaces/network.interface'

export enum KinEnvironment {
  Prod = 'Production',
  Test = 'Test',
}

export const explorerUrls = new Map<KinEnvironment, string>([
  [KinEnvironment.Test, '?cluster=custom&customUrl=https%3A%2F%2Flocal.validator.agorainfra.dev'],
  [KinEnvironment.Prod, ''],
])

export const urls = new Map<KinEnvironment, string>([
  [KinEnvironment.Test, 'https://gateway.agorainfra.dev'],
  [KinEnvironment.Prod, 'https://gateway.agorainfra.net'],
])

export function getAgoraUrls(env: KinEnvironment) {
  const url = urls.get(env)

  return {
    createAccountURL: `${url}/api/kin.agora.account.v4.Account/CreateAccount`,
    getAccountInfoURL: `${url}/api/kin.agora.account.v4.Account/GetAccountInfo`,
    requestAirdropURL: `${url}/api/kin.agora.airdrop.v4.Airdrop/RequestAirdrop`,
    getServiceConfigURL: `${url}/api/kin.agora.transaction.v4.Transaction/GetServiceConfig`,
    getRecentBlockhashURL: `${url}/api/kin.agora.transaction.v4.Transaction/GetRecentBlockhash`,
    getMinBalanceURL: `${url}/api/kin.agora.transaction.v4.Transaction/GetMinimumBalanceForRentExemption`,
    resolveTokenAccountsURL: `${url}/api/kin.agora.account.v4.Account/ResolveTokenAccounts`,
    submitTransactionURL: `${url}/api/kin.agora.transaction.v4.Transaction/SubmitTransaction`,
  }
}

export function createNetwork(id: string, name: string, env: KinEnvironment): Network {
  return {
    id,
    name,
    env,
    url: urls.get(env),
    explorerUrl: explorerUrls.get(env),
  }
}
export const KinProd: Network = createNetwork('mainnet', 'Mainnet', KinEnvironment.Prod)
export const KinTest: Network = createNetwork('testnet', 'Testnet', KinEnvironment.Test)

export const NETWORKS: Network[] = [KinProd, KinTest]
