import { withIronSessionApiRoute } from 'iron-session/next'
import { NonceRequest, NonceResponse } from '../types'
import { ironOptions, RequestHandler, withMethodValidation } from '../utils'
import { firestore, userWithAddress } from '@echo/firebase-admin'
import { isNil } from 'rambda'
import { generateNonce } from 'siwe'
import { FirebaseDocument } from '@echo/firebase'

const handler: RequestHandler<NonceRequest, NonceResponse> = async (req, res) => {
  const { address } = req.body
  const userDoc = await userWithAddress(address)
  let nonce
  if (isNil(userDoc)) {
    nonce = generateNonce()
    await firestore().collection(FirebaseDocument.USERS).doc().set({
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

export const nonce = withIronSessionApiRoute(withMethodValidation(handler, ['POST']), ironOptions)
