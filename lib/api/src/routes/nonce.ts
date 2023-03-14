import { ironOptions } from '../config/iron-options'
import { NonceResponse } from '../types'
import { RequestHandler } from '../types/handlers/request-handler'
import { NonceApiRequest } from '../types/models/api-requests/nonce-api-request'
import { withMethodValidation } from '../utils/with-method-validation'
import { addUser, findUserByWallet } from '@echo/firebase-admin'
import { R } from '@mobily/ts-belt'
import { getAddress } from 'ethers'
import { withIronSessionApiRoute } from 'iron-session/next'
import { generateNonce } from 'siwe'

const handler: RequestHandler<NonceApiRequest, NonceResponse> = async (req, res) => {
  const formattedAddress = getAddress(req.body.address)
  // FIXME the chain id needs to be sent in the request as well
  const wallet = {
    chainId: 1,
    address: formattedAddress
  }
  const result = await findUserByWallet(wallet)
  const userExists = !R.isError(result)
  const nonce = userExists ? R.getExn(result).nonce : generateNonce()

  if (!userExists) {
    await addUser({
      nonce,
      wallets: [wallet]
    })
  }
  await req.session.save()
  res.send({ nonce })
}

export const nonce = withIronSessionApiRoute(withMethodValidation(handler, ['POST']), ironOptions)
