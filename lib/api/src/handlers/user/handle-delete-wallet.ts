import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { removeUserWallet } from '../../helpers/user/remove-user-wallet'
import { updateUserNfts } from '../../helpers/user/update-user-nfts'
import { EmptyResponse, ErrorResponse } from '@echo/api-public'
import { Wallet } from '@echo/firestore'
import { NextApiResponse } from 'next'
import { Session } from 'next-auth'

export const handleDeleteWallet = async (
  session: Session | undefined,
  wallet: Wallet,
  res: NextApiResponse<EmptyResponse | ErrorResponse>
) => {
  const user = getUserFromSession(session)
  await removeUserWallet(user.id, wallet)
  await updateUserNfts(user)
  return res.status(200).json({})
}
