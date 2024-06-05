import type { Wallet } from '@echo/model/types/wallet'
import type { Nullable } from '@echo/utils/types/nullable'
import { toLower } from 'ramda'

export function getOpenSeaUrlForNft(contract: Wallet, tokenId: number): Nullable<Lowercase<string>> {
  const { address, chain } = contract

  if (chain === 'blast') {
    return toLower(`https://opensea.io/assets/blast/${address}/${tokenId}`)
  }
  if (chain === 'ethereum') {
    return toLower(`https://opensea.io/assets/ethereum/${address}/${tokenId}`)
  }
  if (chain === 'sepolia') {
    return toLower(`https://testnets.opensea.io/assets/sepolia/${address}/${tokenId}`)
  }
  return undefined
}
