import { RequestHandler } from '../../types/handlers/request-handler'
import { updateUserNfts } from '../../helpers/handler/update-user-nfts'
import { ApiRequest } from '@echo/api-public'
import { findUserById } from '@echo/firestore'
import { errorMessage } from '@echo/utils'

export const syncNftHandler: RequestHandler<ApiRequest<{ userId: string }, never>, never> = async (req, res) => {
  return findUserById(req.body.userId)
    .then((user) =>
      updateUserNfts(user)
        .then(() =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          res.status(200).json({})
        )
        .catch((e) => {
          res.end(res.status(500).json({ error: errorMessage(e) }))
          return
        })
    )
    .catch(() => {
      res.end(res.status(400).json({ error: 'Invalid user Id' }))
      return
    })
}
