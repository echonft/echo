import { RequestHandler } from '../../types/handlers/request-handler'
import { updateUserNfts } from '../../utils/handler/update-user-nfts'
import { ApiRequest } from '@echo/api-public'
import { findUserById } from '@echo/firebase-admin'
import { errorMessage } from '@echo/utils'
import { R } from '@mobily/ts-belt'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const syncNftHandler: RequestHandler<ApiRequest<{ userId: string }, never>, never> = async (req, res) => {
  const userResult = await findUserById(req.body.userId)
  if (R.isError(userResult)) {
    return res.end(res.status(400).json({ error: 'Invalid user Id' }))
  }
  const user = R.getExn(userResult)
  return updateUserNfts(user)
    .then(() =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      res.status(200).json({})
    )
    .catch((e) => {
      res.end(res.status(500).json({ error: errorMessage(e) }))
      return
    })
}
