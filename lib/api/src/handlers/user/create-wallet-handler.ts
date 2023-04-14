import { ErrorResponse } from '../../types'
import { WalletResponse } from '../../types/models/responses/wallet-response'
import { findNonceForUser, updateUserWallets } from '@echo/firebase-admin'
import { addWallet, Signature, User, Wallet } from '@echo/model'
import { R } from '@mobily/ts-belt'
import { NextApiResponse } from 'next'
import { isNil } from 'ramda'
import { SiweMessage } from 'siwe'

export const createWalletHandler = async (
  user: User,
  wallet: Wallet,
  message: SiweMessage,
  signature: Signature,
  res: NextApiResponse<WalletResponse | ErrorResponse>
) => {
  const siweMessage = new SiweMessage(message)
  let nonce
  try {
    nonce = (await siweMessage.validate(signature)).nonce
  } catch (e) {
    res.end(res.status(401).json({ error: 'Could not validate message' }))
    return
  }
  const nonceResult = await findNonceForUser(user.id)

  if (R.isError(nonceResult)) {
    res.end(res.status(403).json({ error: 'No nonce found for user.' }))
    return
  }

  if (isNil(nonce) || nonce !== R.getExn(nonceResult)) {
    res.end(res.status(422).json({ error: 'Invalid nonce.' }))
    return
  }

  const wallets = addWallet(user.wallets ?? [], wallet)
  return updateUserWallets(user.id, wallets)
    .then(() => res.status(200).json({ wallets }))
    .catch(() => {
      res.end(res.status(500).json({ error: 'User not found' }))
      return
    })
}
