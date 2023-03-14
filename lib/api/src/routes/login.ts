import { ironOptions } from '../config/iron-options'
import { LoginResponse } from '../types'
import { RequestHandler } from '../types/handlers/request-handler'
import { LoginApiRequest } from '../types/models/api-requests/login-api-request'
import { verifySignature } from '../utils/verify-signature'
import { withExistingUserAddress } from '../utils/with-existing-user'
import { withMethodValidation } from '../utils/with-method-validation'
import { auth, findUserByWallet, updateUserById } from '@echo/firebase-admin'
import { errorMessage } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { getAddress } from 'ethers/lib/utils'
import { withIronSessionApiRoute } from 'iron-session/next'
import { isNil } from 'ramda'
import { generateNonce } from 'siwe'

// TODO Add the collection here
const handler: RequestHandler<LoginApiRequest, LoginResponse> = async (req, res) => {
  try {
    const { message, signature, address, discordId } = req.body
    const formattedAddress = getAddress(address)
    const fields = await verifySignature(message, signature)
    // FIXME the chain id needs to be sent in the request as well
    const result = await findUserByWallet({
      chainId: 1,
      address: formattedAddress
    })
    if (R.isError(result)) {
      return res.status(404).json({ error: `UNAUTHORIZED: No user found` })
    }
    const user = R.getExn(result)
    if (fields.nonce !== user.nonce) {
      return res.status(422).json({ error: 'Invalid nonce.' })
    }
    // Set user data and regenerate nonce to avoid replay attacks
    if (isNil(discordId)) {
      // TODO We need to figure that out, not sure we need to send the discord ID all the time
      // we probably actually just need it the first time, so maybe a different call for signup?
      await updateUserById(user.id, { nonce: generateNonce() })
    } else {
      await updateUserById(user.id, { nonce: generateNonce(), discordId })
    }
    const apiKey = await auth().createCustomToken(formattedAddress)
    res.json({ apiKey })
  } catch (error) {
    return res.status(404).json({ error: `UNAUTHORIZED: ${errorMessage(error)}` })
  }
}

export const login = withIronSessionApiRoute(
  withExistingUserAddress(withMethodValidation(handler, ['POST'])),
  ironOptions
)
