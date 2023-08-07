import { syncCollectionHandler, withAdmin, withMethodValidation } from '@echo/api'
import { ApiRequest, ErrorResponse } from '@echo/api-public'
import { NextApiResponse } from 'next'

const syncCollection = async (
  req: ApiRequest<{ collectionId: string }, never>,
  res: NextApiResponse<ErrorResponse>
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await withMethodValidation(withAdmin(syncCollectionHandler), ['PUT'])(req, res)
  } catch (error) {
    return
  }
}

export default syncCollection
