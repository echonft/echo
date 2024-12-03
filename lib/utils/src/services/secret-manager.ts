import { base64DecodeSchema } from '@echo/model/validators/base64-decode-schema'
import { SecretManagerError } from '@echo/utils/constants/errors/secret-manager-error'
import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'
import type { Secret } from '@echo/utils/constants/secret'
import { gcloudProjectId } from '@echo/utils/helpers/gcloud-project-id'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
import { assoc, isNil, objOf, pipe, prop } from 'ramda'

interface Credentials {
  clientEmail: string
  privateKey: string
}

interface AccessSecretArgs {
  name: Secret
  client: SecretManagerServiceClient
  projectId: string
}

function getCredentials(): Credentials {
  const clientEmail = process.env.SECRET_MANAGER_EMAIL
  if (isNilOrEmpty(clientEmail)) {
    throw Error(SecretManagerError.CredentialsMissing)
  }
  const privateKey = base64DecodeSchema.parse(process.env.SECRET_MANAGER_PRIVATE_KEY)
  if (isNilOrEmpty(privateKey)) {
    throw Error(SecretManagerError.CredentialsMissing)
  }
  return { clientEmail, privateKey }
}

async function connect(projectId: string): Promise<SecretManagerServiceClient> {
  const nodeEnv = nodeEnvironment()
  if (nodeEnv !== NodeEnvironment.Test || !isNil(process.env.K_SERVICE)) {
    const client = new SecretManagerServiceClient({ projectId })
    await client.initialize()
    return client
  } else {
    const credentials = getCredentials()
    const { clientEmail, privateKey } = credentials
    const client = new SecretManagerServiceClient({
      projectId,
      credentials: {
        client_email: clientEmail,
        private_key: privateKey
      }
    })
    await client.initialize()
    return client
  }
}

async function accessSecret(args: AccessSecretArgs): Promise<Record<Secret, string>> {
  const { client, name, projectId } = args
  const [version] = await client.accessSecretVersion({
    name: `projects/${projectId}/secrets/${name}/versions/latest`
  })
  if (isNil(version.payload) || isNil(version.payload.data)) {
    return Promise.reject(Error(SecretManagerError.NotFound))
  }
  return objOf(name, version.payload.data.toString())
}

async function initialize() {
  const projectId = gcloudProjectId()
  const client = await connect(projectId)
  return { client, projectId }
}

export async function getSecret(name: Secret): Promise<string> {
  const params = await initialize()
  const secret = await pipe(assoc('name', name), accessSecret)(params)
  await params.client.close()
  return prop(name, secret)
}
