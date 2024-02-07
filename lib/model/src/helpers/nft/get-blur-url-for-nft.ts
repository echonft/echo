import type { Contract } from '@echo/model/types/contract'
import type { Nullable } from '@echo/utils/types/nullable'
import { toLower } from 'ramda'

export function getBlurUrlForNft(contract: Contract, tokenId: number): Nullable<Lowercase<string>> {
  const { address, chainId } = contract
  if (chainId === 1) {
    return toLower(`https://blur.io/asset/${address}/${tokenId}`)
  }
  return undefined
}
