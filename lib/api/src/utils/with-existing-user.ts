import { RequestHandler } from '../types/handlers/request-handler'
import { ApiRequestWithAddress } from '../types/models/api-requests/api-request-with-address'
import { ApiRequestWithUserId } from '../types/models/api-requests/api-request-with-user-id'
import { findUserById, findUserByWallet } from '@echo/firebase-admin'
import { R } from '@mobily/ts-belt'
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
    const result = await findUserById(userId)
    if (R.isError(result)) {
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
    // FIXME the chain id needs to be sent in the request as well - this will not work
    const result = await findUserByWallet({
      chainId: 1,
      address: formattedAddress
    })
    if (R.isError(result)) {
      return res.status(404).json({ error: `UNAUTHORIZED: No user found` })
    }
    return handler(req, res)
  }
}
