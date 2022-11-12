import { ironOptions } from './_utils/iron-options'
import { verifySignature } from './_utils/verify-utils'
import { getFirebase } from '@echo/firebase/getters/get-firebase'
import { getUserWithAddress } from '@echo/firebase/getters/get-user'
import { ApiLoginRequest } from '@lib/models/api/login-request'
import { getAddress } from 'ethers/lib/utils'
import { withIronSessionApiRoute } from 'iron-session/next'
import { isNil } from 'ramda'
import { generateNonce } from 'siwe'

// TODO Add the collection here
const handler = async (req: ApiLoginRequest, res: any) => {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        const { message, signature, address, discordId } = req.body
        const formattedAddress = getAddress(address)
        const fields = await verifySignature(message, signature)
        const userDoc = await getUserWithAddress(formattedAddress)
        if (isNil(userDoc)) {
          return res.status(404).send(`UNAUTHORIZED: No user found`)
        }
        const user = userDoc.data()
        if (fields.nonce !== user.nonce) {
          return res.status(422).json({ message: 'Invalid nonce.' })
        }
        // Set user data and regenerate nonce to avoid replay attacks
        if (isNil(discordId)) {
          // TODO We need to figure that out, not sure we need to send the discord ID all the time
          // we probably actually just need it the first time, so maybe a different call for signup?
          await userDoc.ref.set({ ...user, nonce: generateNonce(), wallet: formattedAddress })
        } else {
          await userDoc.ref.set({ nonce: generateNonce(), wallet: formattedAddress, discordId })
        }
        const apiKey = await getFirebase().auth().createCustomToken(formattedAddress)
        res.json({ apiKey })
      } catch (error) {
        return res.status(404).send(`UNAUTHORIZED: ${error}`)
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
