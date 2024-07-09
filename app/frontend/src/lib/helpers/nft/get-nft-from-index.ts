import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import type { Nft, NftIndex } from '@echo/model/types/nft'
import { isNil } from 'ramda'

export async function getNftFromIndex(index: NftIndex): Promise<Nft> {
  const nft = await getNft(index)
  if (isNil(nft)) {
    return Promise.reject(new BadRequestError())
  }
  return nft
}
