import { ironOptions } from './_utils/iron-options'
import { getFirebase } from '@echo/firebase/getters/get-firebase'
import { getUserWithAddress } from '@echo/firebase/getters/get-user'
import { NonceRequest } from '@lib/services/api/models/nonce-request'
import { NonceResponse } from '@lib/services/api/models/nonce-response'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse } from 'next'
import { isNil } from 'ramda'
import { generateNonce } from 'siwe'

const handler = async (req: NonceRequest, res: NextApiResponse<NonceResponse>) => {
  const { method } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  } else {
    const { address } = req.body
    const userDoc = await getUserWithAddress(address)
    let nonce
    if (isNil(userDoc)) {
      nonce = generateNonce()
      await getFirebase().firestore().collection('users').doc().set({
        nonce,
        wallet: address,
      })
    } else {
      const user = userDoc.data()
      nonce = user.nonce
    }
    await req.session.save()
    res.send({ nonce })
  }
}
export default withIronSessionApiRoute(handler, ironOptions)
