import { getGCloudProjectId } from '@echo/utils/helpers/get-gcloud-project-id'
import { now } from '@echo/utils/helpers/now'
import { getBaseLogger } from '@echo/utils/services/pino-logger'
import type { Nullable } from '@echo/utils/types/nullable'
import type { OAuthToken } from '@echo/utils/types/oauth-token'
import type { OAuthTokenResponse } from '@echo/utils/types/oauth-token-response'
import type { Secret } from '@echo/utils/types/secret'
import { OAuthTokenSchema } from '@echo/utils/validators/oauth-token-schema'
import { privateKeySchema } from '@echo/utils/validators/private-key-schema'
import axios from 'axios'
import dayjs from 'dayjs'
import { KJUR } from 'jsrsasign'
import { isNil } from 'ramda'

let token: OAuthToken
const logger = getBaseLogger('REST Secret Manager')

function createJwtToken() {
  const clientEmail = process.env.SECRET_MANAGER_EMAIL
  const privateKey = privateKeySchema.parse(process.env.SECRET_MANAGER_PRIVATE_KEY)
  const header = { alg: 'RS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iss: clientEmail,
    sub: clientEmail,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
    scope: 'https://www.googleapis.com/auth/cloud-platform'
  }
  return KJUR.jws.JWS.sign('RS256', JSON.stringify(header), JSON.stringify(payload), privateKey)
}

async function getAccessToken() {
  const jwtToken = createJwtToken()
  try {
    const response = await axios.post<OAuthTokenResponse>('https://oauth2.googleapis.com/token', null, {
      params: {
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwtToken
      }
    })
    logger.info({ msg: 'successfully fetched a new token' })
    token = OAuthTokenSchema.parse(response.data)
  } catch (error) {
    logger.error({ msg: 'error fetching access token', error })
  }
}

export async function getSecretFromRestApi(name: Secret): Promise<Nullable<string>> {
  if (isNil(token)) {
    logger.info({ msg: 'no access token found - generating a new one...' })
    await getAccessToken()
  } else if (dayjs.unix(token.expiresAt).isBefore(now())) {
    logger.info({ msg: 'access token expired - generating a new one...' })
    await getAccessToken()
  } else {
    logger.info({ msg: 'not expired access token found' })
  }
  if (isNil(token) || isNil(token.accessToken)) {
    logger.error({ msg: 'could not fetch an access token' })
    return undefined
  }
  try {
    const url = `https://secretmanager.googleapis.com/v1/projects/${getGCloudProjectId()}/secrets/${name}/versions/latest:access`
    const response = await axios.get<string>(url, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      }
    })
    logger.info({ msg: `secret ${name} found. Delivering it...` })
    return response.data
  } catch (error) {
    logger.error({ msg: `error fetching secret ${name}`, error })
    return undefined
  }
}
