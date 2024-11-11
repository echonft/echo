import { scopes } from '@echo/firestore-functions/constants/auth'
import { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { cloudFunctionRoute } from '@echo/firestore-functions/constants/cloud-function-route'
import { CloudFunctionError } from '@echo/firestore-functions/constants/errors/cloud-function-error'
import { error } from 'firebase-functions/logger'
import { GoogleAuth } from 'google-auth-library'

interface Request {
  serviceConfig?: { uri: string }
}

export async function getCloudFunctionUrl(name: CloudFunctionName) {
  const auth = new GoogleAuth({
    scopes
  })
  const projectId = await auth.getProjectId()
  const url = cloudFunctionRoute.getUrl({ projectId, name })
  const client = await auth.getClient()
  const res = await client.request<Request>({ url })
  const uri = res.data.serviceConfig?.uri
  if (!uri) {
    error({ url, projectId, name }, CloudFunctionError.Uri)
    return Promise.reject(Error(CloudFunctionError.Uri))
  }
  return uri
}
