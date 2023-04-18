import { getHasNftHandler } from '../../handlers/user/get-has-nft-handler'
import { ApiRequest } from '../../types/models/api-requests/api-request'
import { UserHasNftRequest } from '../../types/models/requests/user-has-nft-request'
import { ErrorResponse } from '../../types/models/responses/error-response'
import { UserHasNftResponse } from '../../types/models/responses/user-has-nft-response'
import { withMethodValidation } from '../../utils/with-method-validation'
import { NextApiResponse } from 'next'

export const getHasNft = async (
  req: ApiRequest<null, UserHasNftRequest>,
  res: NextApiResponse<ErrorResponse | UserHasNftResponse>
) => {
  try {
    await withMethodValidation(getHasNftHandler, ['GET'])(req, res)
  } catch (error) {
    return
  }
}
