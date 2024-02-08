import type { Contract } from '@echo/model/types/contract'
import type { Nullable } from '@echo/utils/types/nullable'
import { toLower } from 'ramda'

export function getOpenSeaUrlForNft(contract: Contract, tokenId: number): Nullable<Lowercase<string>> {
  const { address, chainId } = contract
  if (chainId === 1) {
    return toLower(`https://opensea.io/assets/ethereum/${address}/${tokenId}`)
  }
  if (chainId === 11155111) {
    return toLower(`https://testnets.opensea.io/assets/sepolia/${address}/${tokenId}`)
  }
  return undefined
}
