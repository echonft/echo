import { error } from 'firebase-functions/logger'
import { GoogleAuth } from 'google-auth-library'

export async function getFunctionUrl(name: string, location = 'us-central1') {
  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform'
  })
  const projectId = await auth.getProjectId()
  const url =
    'https://cloudfunctions.googleapis.com/v2beta/' + `projects/${projectId}/locations/${location}/functions/${name}`
  const client = await auth.getClient()
  const res = await client.request<{ serviceConfig?: { uri: string } }>({ url })
  const uri = res.data?.serviceConfig?.uri
  if (!uri) {
    error(`Unable to retreive uri for function at ${url}`)
    return undefined
  }
  return uri
}
