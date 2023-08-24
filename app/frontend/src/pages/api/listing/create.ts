import { authOptions } from '../auth/[...nextauth]'
import { createListingHandler, withMethodValidation, withSession } from '@echo/api'
import { ApiRequest, CreateListingRequest, ErrorResponse, IdResponse } from '@echo/api-public'
import { NextApiResponse } from 'next'

const createListing = async (
  req: ApiRequest<CreateListingRequest, never>,
  res: NextApiResponse<ErrorResponse | IdResponse>
) => {
  try {
    await withMethodValidation(withSession(createListingHandler, authOptions), ['PUT'])(req, res)
  } catch (error) {
    return
  }
}

export default createListing
