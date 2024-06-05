import type { Wallet } from '@echo/model/types/wallet'
import type { Nullable } from '@echo/utils/types/nullable'
import { toLower } from 'ramda'

export function getBlurUrlForNft(contract: Wallet, tokenId: number): Nullable<Lowercase<string>> {
  const { address, chain } = contract
  if (chain === 'ethereum') {
    return toLower(`https://blur.io/eth/asset/${address}/${tokenId}`)
  } else if (chain === 'blast') {
    return toLower(`https://blur.io/blast/asset/${address}/${tokenId}`)
  }
  return undefined
}
