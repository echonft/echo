import { authOptions } from '../auth/[...nextauth]'
import { withMethodValidation, withSession } from '@echo/api'
import { ApiRequest, EmptyResponse, ErrorResponse, IdRequest } from '@echo/api-public'
import { NextApiResponse } from 'next'

const cancelListing = async (
  req: ApiRequest<IdRequest, never>,
  res: NextApiResponse<ErrorResponse | EmptyResponse>
) => {
  try {
    await withMethodValidation(withSession(cancelListing, authOptions), ['PUT'])(req, res)
  } catch (error) {
    return
  }
}

export default cancelListing
