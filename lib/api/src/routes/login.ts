import { auth, userWithAddress } from '@echo/firebase-admin'
import { errorMessage } from '@echo/utils'
import { getAddress } from 'ethers/lib/utils'
import { withIronSessionApiRoute } from 'iron-session/next'
import { isNil } from 'rambda'
import { generateNonce } from 'siwe'
import { ApiLoginRequest, LoginResponse } from '../types'
import { ironOptions, RequestHandler, verifySignature, withExistingUserAddress, withMethodValidation } from '../utils'

// TODO Add the collection here
const handler: RequestHandler<ApiLoginRequest, LoginResponse> = async (req, res) => {
  try {
    const { message, signature, address, discordId } = req.body
    const formattedAddress = getAddress(address)
    const fields = await verifySignature(message, signature)
    const userDoc = await userWithAddress(formattedAddress)
    if (isNil(userDoc)) {
      return res.status(404).json({ error: `UNAUTHORIZED: No user found` })
    }
    const user = userDoc.data()
    if (fields.nonce !== user.nonce) {
      return res.status(422).json({ error: 'Invalid nonce.' })
    }
    // Set user data and regenerate nonce to avoid replay attacks
    if (isNil(discordId)) {
      // TODO We need to figure that out, not sure we need to send the discord ID all the time
      // we probably actually just need it the first time, so maybe a different call for signup?
      await userDoc.ref.set({ ...user, nonce: generateNonce(), wallet: formattedAddress })
    } else {
      await userDoc.ref.set({ nonce: generateNonce(), wallet: formattedAddress, discordId })
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
