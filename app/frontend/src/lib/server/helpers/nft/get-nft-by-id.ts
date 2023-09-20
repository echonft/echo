import { findNftById } from '@echo/firestore/crud/nft/find-nft-by-id'
import { ServerError } from '@server/helpers/error/server-error'

export async function getNftById(id: string) {
  try {
    return await findNftById(id)
  } catch (e) {
    throw new ServerError(`error finding nft with id ${id}`, e)
  }
}
