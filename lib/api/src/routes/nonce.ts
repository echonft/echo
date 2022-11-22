import { ErrorResponse } from '../models/error-response'
import { NonceRequest } from '../models/nonce-request'
import { NonceResponse } from '../models/nonce-response'
import { ironOptions } from '../utils/iron-options'
import { getAdminFirebase } from '@echo/firebase-admin/config/config'
import { getUserWithAddress } from '@echo/firebase-admin/getters/get-user'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse } from 'next'
import { isNil } from 'ramda'
import { generateNonce } from 'siwe'

const handler = async (req: NonceRequest, res: NextApiResponse<NonceResponse | ErrorResponse>) => {
  const { method } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ error: `Method ${method} Not Allowed` })
  } else {
    const { address } = req.body
    const userDoc = await getUserWithAddress(address)
    let nonce
    if (isNil(userDoc)) {
      nonce = generateNonce()
      await getAdminFirebase().firestore().collection('users').doc().set({
        nonce,
        wallet: address
      })
    } else {
      const user = userDoc.data()
      nonce = user.nonce
    }
    await req.session.save()
    res.send({ nonce })
  }
}

export const nonce = withIronSessionApiRoute(handler, ironOptions)
