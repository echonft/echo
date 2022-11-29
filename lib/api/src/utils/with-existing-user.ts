import { ApiRequestWithUserId } from '../models/create-offer-request'
import { ApiRequestWithAddress } from '../models/login-request'
import { RequestHandler } from '../utils/request-handler'
import { getUserSnapshot, getUserWithAddress } from '@echo/firebase-admin/getters/get-user'
import { getAddress } from 'ethers/lib/utils'
import { isNil } from 'rambda'

export function withExistingUser<T extends ApiRequestWithUserId, U>(
  handler: RequestHandler<T, U>
): RequestHandler<T, U> {
  return async function withValidation(req, res) {
    const { userId } = req.body
    if (isNil(userId)) {
      return res.status(404).json({ error: 'UNAUTHORIZED: No user provided' })
    }
    const userSnapshot = await getUserSnapshot(userId)
    if (!userSnapshot.exists) {
      return res.status(404).json({ error: 'UNAUTHORIZED: No user found' })
    }
    return handler(req, res)
  }
}

export function withExistingUserAddress<T extends ApiRequestWithAddress, U>(
  handler: RequestHandler<T, U>
): RequestHandler<T, U> {
  return async function withValidation(req, res) {
    const { address } = req.body
    if (isNil(address)) {
      return res.status(404).json({ error: 'UNAUTHORIZED: No address provided' })
    }
    const formattedAddress = getAddress(address)
    const userDoc = await getUserWithAddress(formattedAddress)
    if (isNil(userDoc)) {
      return res.status(404).json({ error: `UNAUTHORIZED: No user found` })
    }
    return handler(req, res)
  }
}
