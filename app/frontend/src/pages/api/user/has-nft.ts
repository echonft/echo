import {
  ApiRequest,
  ErrorResponse,
  getHasNftHandler,
  UserHasNftRequest,
  UserHasNftResponse,
  withMethodValidation
} from '@echo/api'
import { NextApiResponse } from 'next'

const getHasNft = async (
  req: ApiRequest<null, UserHasNftRequest>,
  res: NextApiResponse<ErrorResponse | UserHasNftResponse>
) => {
  try {
    await withMethodValidation(getHasNftHandler, ['GET'])(req, res)
  } catch (error) {
    return
  }
}

export default getHasNft
