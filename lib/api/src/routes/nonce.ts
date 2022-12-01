import { ErrorResponse, NonceRequest, NonceResponse } from '../types'
import { ironOptions } from '../utils'
import { firestore, userWithAddress } from '@echo/firebase-admin'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse } from 'next'
import { isNil } from 'rambda'
import { generateNonce } from 'siwe'

const handler = async (req: NonceRequest, res: NextApiResponse<NonceResponse | ErrorResponse>) => {
  const { method } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ error: `Method ${isNil(method) ? '' : method} Not Allowed` })
  } else {
    const { address } = req.body
    const userDoc = await userWithAddress(address)
    let nonce
    if (isNil(userDoc)) {
      nonce = generateNonce()
      await firestore().collection('users').doc().set({
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
