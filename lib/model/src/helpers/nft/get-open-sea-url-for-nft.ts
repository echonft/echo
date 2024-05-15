import type { Contract } from '@echo/model/types/collection'
import { BLAST_CHAIN_ID, MAINNET_CHAIN_ID, SEPOLIA_CHAIN_ID } from '@echo/utils/constants/chain-ids'
import type { Nullable } from '@echo/utils/types/nullable'
import { toLower } from 'ramda'

export function getOpenSeaUrlForNft(contract: Contract, tokenId: number): Nullable<Lowercase<string>> {
  const { address, chainId } = contract
  if (chainId === BLAST_CHAIN_ID) {
    return toLower(`https://opensea.io/assets/blast/${address}/${tokenId}`)
  }
  if (chainId === MAINNET_CHAIN_ID) {
    return toLower(`https://opensea.io/assets/ethereum/${address}/${tokenId}`)
  }
  if (chainId === SEPOLIA_CHAIN_ID) {
    return toLower(`https://testnets.opensea.io/assets/sepolia/${address}/${tokenId}`)
  }
  return undefined
}
