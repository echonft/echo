import type { Address } from '@echo/model/types/address'
import { getNftsByWallet } from '@echo/nft-scan/services/get-nfts-by-wallet'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { andThen, collectBy, path, pipe } from 'ramda'

/**
 * Fetches NFTs from the API and groups them by collection
 * @param wallet
 */
export function fetchNftsByWallet(wallet: Address): Promise<PartialNft[][]> {
  return pipe(getNftsByWallet, andThen(collectBy(path(['collection', 'contract']))))(wallet)
}
