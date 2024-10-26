export enum WalletError {
  Exists = 'wallet already exists',
  NonceExpired = 'expired nonce',
  NonceInvalid = 'invalid nonce',
  NonceNotFound = 'nonce does not exist',
  NotFound = 'wallet does not exist',
  SignatureInvalid = 'invalid signature'
}
