import { RequestHandler } from '../types/handlers/request-handler'
import { ApiRequestWithAddress } from '../types/models/api-requests/api-request-with-address'
import { ApiRequestWithUserId } from '../types/models/api-requests/api-request-with-user-id'
import { userSnapshot, userWithAddress } from '@echo/firebase-admin'
import { getAddress } from 'ethers/lib/utils'
import { isNil } from 'rambda'

export function withExistingUser<T extends ApiRequestWithUserId, U>(
  handler: RequestHandler<T, U>
): RequestHandler<T, U> {
  return async function (req, res) {
    const { userId } = req.body
    if (isNil(userId)) {
      return res.status(404).json({ error: 'UNAUTHORIZED: No user provided' })
    }
    const user = await userSnapshot(userId)
    if (!user.exists) {
      return res.status(404).json({ error: 'UNAUTHORIZED: No user found' })
    }
    return handler(req, res)
  }
}

export function withExistingUserAddress<T extends ApiRequestWithAddress, U>(
  handler: RequestHandler<T, U>
): RequestHandler<T, U> {
  return async function (req, res) {
    const { address } = req.body
    if (isNil(address)) {
      return res.status(404).json({ error: 'UNAUTHORIZED: No address provided' })
    }
    const formattedAddress = getAddress(address)
    const userDoc = await userWithAddress(formattedAddress)
    if (isNil(userDoc)) {
      return res.status(404).json({ error: `UNAUTHORIZED: No user found` })
    }
    return handler(req, res)
  }
}
