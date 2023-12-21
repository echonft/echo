import { cert } from 'firebase-admin/app'
import { isEmpty, isNil } from 'ramda'

export function getCredential() {
  const projectId = process.env.FIREBASE_PROJECT_ID
  if (isNil(projectId) || isEmpty(projectId)) {
    throw new Error('.env should contain FIREBASE_PROJECT_ID')
  }
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  if (isNil(clientEmail) || isEmpty(clientEmail)) {
    throw new Error('.env should contain FIREBASE_CLIENT_EMAIL')
  }
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
  if (isNil(privateKey) || isEmpty(privateKey)) {
    throw new Error('.env should contain FIREBASE_PRIVATE_KEY')
  }
  return {
    credential: cert({
      projectId,
      clientEmail,
      privateKey: Buffer.from(privateKey, 'base64').toString('ascii')
    })
  }
}
