import type { Address } from '@echo/model/types/address'
import { fetchNft } from '@echo/nft-scan/fetchers/fetch-nft'
import { info } from '@echo/nft-scan/helpers/logger'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export interface GetNftArgs {
  contract: Address
  tokenId: number
}

export async function getNft({ contract, tokenId }: GetNftArgs): Promise<Nullable<PartialNft>> {
  info({ nft: { collection: { contract }, tokenId } }, 'fetching nft from NFTScan...')
  const nft = await fetchNft({ contract, identifier: tokenId.toString(10) })
  if (isNil(nft)) {
    info({ nft: { collection: { contract }, tokenId } }, 'nft not found on NFTScan')
  } else {
    info({ nft }, 'fetched nft from NFTScan')
  }
  return nft
}
