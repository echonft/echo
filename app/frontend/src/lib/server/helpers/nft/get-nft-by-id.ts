import { ServerError } from '../error/server-error'
import { findNftById } from '@echo/firestore'

export const getNftById = async (id: string) => {
  try {
    return await findNftById(id)
  } catch (e) {
    throw new ServerError(`error finding nft with id ${id}`, e)
  }
}
