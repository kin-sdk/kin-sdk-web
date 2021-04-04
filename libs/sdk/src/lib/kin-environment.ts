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
    resolveTokenAccountsURL: `${url}/api/kin.agora.account.v4.Account/ResolveTokenAccounts`,
    getAccountInfoURL: `${url}/api/kin.agora.account.v4.Account/GetAccountInfo`,
    getServiceConfigURL: `${url}/api/kin.agora.transaction.v4.Transaction/GetServiceConfig`,
    getRecentBlockhashURL: `${url}/api/kin.agora.transaction.v4.Transaction/GetRecentBlockhash`,
    getMinBalanceURL: `${url}/api/kin.agora.transaction.v4.Transaction/GetMinimumBalanceForRentExemption`,
    submitTransactionURL: `${url}/api/kin.agora.transaction.v4.Transaction/SubmitTransaction`,
  }
}
