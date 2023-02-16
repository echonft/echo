import { isProd } from './index'
import { isEmpty, isNil } from 'ramda'

// Mainnet and Goerli testnet are supported
const supportedChains = [1, 5]
export const chaindId = (): number => {
  const chainEnvVar = process.env.NEXT_PUBLIC_CHAIN_ID
  if (isNil(chainEnvVar) || isEmpty(chainEnvVar)) {
    return isProd ? 1 : 5
  }
  const chainId = Number(chainEnvVar)
  if (isNaN(chainId)) {
    throw Error(`NEXT_PUBLIC_CHAIN_ID env var is not a number: ${chainEnvVar}`)
  }
  if (!supportedChains.includes(chainId)) {
    throw Error(
      `NEXT_PUBLIC_CHAIN_ID env var is not a supported chain: ${chainEnvVar}. Supported chains are ${supportedChains.join(
        ','
      )}`
    )
  }
  return chainId
}
