import type { Contract } from '@echo/model/types/collection'
import { BLAST_CHAIN_ID, ETHEREUM_CHAIN_ID, SEPOLIA_CHAIN_ID } from '@echo/utils/constants/chains/chain-ids'
import { getChainId } from '@echo/utils/helpers/get-chain-id'
import type { Nullable } from '@echo/utils/types/nullable'
import { toLower } from 'ramda'

export function getOpenSeaUrlForNft(contract: Contract, tokenId: number): Nullable<Lowercase<string>> {
  const { address, chain } = contract
  const chainId = getChainId(chain)

  if (chainId === BLAST_CHAIN_ID) {
    return toLower(`https://opensea.io/assets/blast/${address}/${tokenId}`)
  }
  if (chainId === ETHEREUM_CHAIN_ID) {
    return toLower(`https://opensea.io/assets/ethereum/${address}/${tokenId}`)
  }
  if (chainId === SEPOLIA_CHAIN_ID) {
    return toLower(`https://testnets.opensea.io/assets/sepolia/${address}/${tokenId}`)
  }
  return undefined
}
