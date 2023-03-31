import { getHasNftHandler } from '../../handlers/user/get-has-nft-handler'
import { withMethodValidation } from '../../utils/with-method-validation'
import { withSession } from '../../utils/with-session'

export const getFirebaseToken = withMethodValidation(withSession(getHasNftHandler), ['GET'])
