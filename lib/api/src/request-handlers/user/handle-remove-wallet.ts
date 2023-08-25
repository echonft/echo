import { parseRemoveWalletRequest } from '../../helpers/user/parse-remove-wallet-request'
import { removeUserWallet } from '../../helpers/user/remove-user-wallet'
import { updateUserNfts } from '../../helpers/user/update-user-nfts'
import { ApiRequest, ApiResponse, EmptyResponse, RemoveWalletRequest } from '@echo/api-public'
import { User } from '@echo/firestore'

export async function handleRemoveWallet(
  req: ApiRequest<RemoveWalletRequest>,
  res: ApiResponse<EmptyResponse>,
  user: User
) {
  const { wallet } = parseRemoveWalletRequest(req.body)
  await removeUserWallet(user.id, wallet)
  await updateUserNfts(user)
  return res.status(200).json({})
}
