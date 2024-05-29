import type { Contract } from '@echo/model/types/collection'
import { BLAST_CHAIN_ID, ETHEREUM_CHAIN_ID } from '@echo/utils/constants/chains/chain-ids'
import { getChainId } from '@echo/utils/helpers/get-chain-id'
import type { Nullable } from '@echo/utils/types/nullable'
import { toLower } from 'ramda'

export function getBlurUrlForNft(contract: Contract, tokenId: number): Nullable<Lowercase<string>> {
  const { address, chain } = contract
  const chainId = getChainId(chain)
  if (chainId === ETHEREUM_CHAIN_ID) {
    return toLower(`https://blur.io/eth/asset/${address}/${tokenId}`)
  } else if (chainId === BLAST_CHAIN_ID) {
    return toLower(`https://blur.io/blast/asset/${address}/${tokenId}`)
  }
  return undefined
}
