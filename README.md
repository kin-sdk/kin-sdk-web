# kin-sdk

> Source code of the Kin Web SDK.

<p align="center"><img src="https://avatars.githubusercontent.com/u/82057512?s=450" width="450"></p>

## Packages

- [@kin-sdk/client](packages/client/README.md)
- [@kin-sdk/core](packages/core/README.md)

## Demo applications

If you want to implement the Kin Web SDK in your applications, you probably want to start out with one of the demo applications:

- [Angular](https://github.com/kin-sdk/kin-sdk-demo-angular)
- [React](https://github.com/kin-sdk/kin-sdk-demo-react)
- [Vue](https://github.com/kin-sdk/kin-sdk-demo-vue)

If you want to use a framework that's not listed here, please follow the usage instructions down below.

## Usage

In this section you can read how to use the Kin Web SDK in your project.

### Step 0: Install dependencies

You need to install the `@kin-sdk/client` package to your project:

```shell
yarn add @kin-sdk/client
# Or if you are using npm
npm install @kin-sdk/client
```

### Step 1: Initializing the Kin Client

The first thing you need to do is import the `KinClient` and environment (`KinProd` or `KinTest`) into your project, and initialize a new instance of the client:

```typescript
// Import the client
import { KinClient, KinProd } from '@kin-sdk/client'
// Create instance of client
const client = new KinClient(KinProd)
```

### Step 2: Generate a new key pair

In order to interact with the blockchain you need a key pair that consists of a `secret` and `publicKey`.

This account will generally be stored on the users' device, for instance using `IndexedDB`. Make sure that the user has a way to export their secret, so they won't lose access to their Kin.

```typescript
// Generate a new 'account' or 'key-pair'
const account = KinClient.createWallet('create', { name: 'Account 1' })
```

### Step 3: Create an account on Kin blockchain

Use the `secret` of the account you generated in the previous step to create the account on the blockchain.

```typescript
const [result, error] = await client.createAccount(account.secret)
if (error) {
  console.error(error)
}
```

### Step 4: Resolve token Accounts

The next step is resolving the token accounts. A token account is where the Kin is actually stored, as Kin is a token on the Solana blockchain. You can [read more details here](https://docs.kin.org/solana#token-accounts).

```typescript
// Resolve token Accounts
const accounts = await client.resolveTokenAccounts(account.publicKey)
```

### Step 5: Submit a payment.

After this is done, you are ready to submit a payment.

The memo field here is optional, the other fields are required.

```typescript
const secret = account.secret
const tokenAccount = account.publicKey
const amount = '1'
const destination = 'Don8L4DTVrUrRAcVTsFoCRqei5Mokde3CV3K9Ut4nAGZ'
const memo = 'One Kin as a Donation'
await client.submitPayment({
  secret,
  tokenAccount,
  amount,
  destination,
  memo,
})
```

## Support

If you have any issues feel free to join the `#kin-sdk` channel in the [Kintegrate Discord](https://discord.gg/UTHWjKccCJ).
