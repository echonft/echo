import { getEscrowedNft } from '@echo/firestore/crud/escrowed-nft/get-escrowed-nft'
import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import type { Nft, NftIndex } from '@echo/model/types/nft'
import { isNil } from 'ramda'

export async function getEscrowedNftFromIndex(index: NftIndex): Promise<Nft> {
  const nft = await getEscrowedNft(index)
  if (isNil(nft)) {
    throw new BadRequestError(`Escrowed NFT #${index.tokenId} for collection ${index.collection.slug} not found`)
  }
  return nft
}
