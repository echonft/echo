import { syncNftHandler, withAdmin, withMethodValidation } from '@echo/api'
import { ApiRequest, ErrorResponse } from '@echo/api-public'
import { NextApiResponse } from 'next'

const syncNft = async (req: ApiRequest<{ userId: string }, never>, res: NextApiResponse<ErrorResponse>) => {
  try {
    await withMethodValidation(withAdmin(syncNftHandler), ['PUT'])(req, res)
  } catch (error) {
    return
  }
}

export default syncNft
