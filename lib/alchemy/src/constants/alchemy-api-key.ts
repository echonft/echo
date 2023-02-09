import { isMainnet } from '@echo/utils'
import { isEmpty, isNil } from 'rambda'

export function alchemyApiKey(): string {
  const envVar = isMainnet
    ? process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_MAINNET
    : process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_GOERLI
  if (isNil(envVar) || isEmpty(envVar)) {
    throw Error(
      `${isMainnet ? 'NEXT_PUBLIC_ALCHEMY_API_KEY_MAINNET' : 'NEXT_PUBLIC_ALCHEMY_API_KEY_GOERLI'} env var is not set`
    )
  }
  return envVar
}
