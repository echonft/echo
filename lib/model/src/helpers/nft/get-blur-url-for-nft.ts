import type { Contract } from '@echo/model/types/collection'
import { BLAST_CHAIN_ID, MAINNET_CHAIN_ID } from '@echo/utils/constants/chain-ids'
import type { Nullable } from '@echo/utils/types/nullable'
import { toLower } from 'ramda'

export function getBlurUrlForNft(contract: Contract, tokenId: number): Nullable<Lowercase<string>> {
  const { address, chainId } = contract
  if (chainId === MAINNET_CHAIN_ID) {
    return toLower(`https://blur.io/eth/asset/${address}/${tokenId}`)
  } else if (chainId === BLAST_CHAIN_ID) {
    return toLower(`https://blur.io/blast/asset/${address}/${tokenId}`)
  }
  return undefined
}
