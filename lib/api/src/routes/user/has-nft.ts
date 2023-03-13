import { getHasNftHandler } from '../../handlers/user/get-has-nft-handler'
import { withMethodValidation } from '../../utils/with-method-validation'

export const hasNft = withMethodValidation(getHasNftHandler, ['GET'])
