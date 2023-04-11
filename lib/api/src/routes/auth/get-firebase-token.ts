import { getFirebaseTokenHandler } from '../../handlers/auth/get-firebase-token-handler'
import { withMethodValidation } from '../../utils/with-method-validation'
import { withSession } from '../../utils/with-session'

export const getFirebaseToken = withMethodValidation(withSession(getFirebaseTokenHandler), ['GET'])
