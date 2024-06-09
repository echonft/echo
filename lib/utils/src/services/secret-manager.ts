import { environment } from '@echo/utils/constants/environment'
import { isCI } from '@echo/utils/constants/is-ci'
import { isDev } from '@echo/utils/constants/is-dev'
import { isTest } from '@echo/utils/constants/is-test'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { getGCloudProjectId } from '@echo/utils/helpers/get-gcloud-project-id'
import { getBaseLogger } from '@echo/utils/services/pino-logger'
import type { Secret } from '@echo/utils/types/secret'
import { privateKeySchema } from '@echo/utils/validators/private-key-schema'
import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
import { and, isNil, not, or } from 'ramda'

const logger = getBaseLogger('Secret Manager')

interface Credentials {
  clientEmail: string
  privateKey: string
}

let manager: {
  client: SecretManagerServiceClient
  projectId: string
}

function shouldUseCredentials() {
  return not(or(isDev, and(isTest, not(isCI))))
}

function getCredentials(): Credentials {
  const clientEmail = process.env.SECRET_MANAGER_EMAIL
  const privateKey = privateKeySchema.parse(process.env.SECRET_MANAGER_PRIVATE_KEY)
  return { clientEmail, privateKey }
}

async function initializeSecretManager() {
  if (isNil(manager)) {
    logger.info({ msg: 'initializing secret manager' })
    logger.info({ msg: `node env: ${process.env.NODE_ENV}` })
    logger.info({ msg: `env: ${environment}` })
    const projectId = getGCloudProjectId()
    logger.info({ msg: `project id: ${projectId}` })
    try {
      if (shouldUseCredentials()) {
        const { clientEmail, privateKey } = getCredentials()
        const client = new SecretManagerServiceClient({
          projectId,
          credentials: {
            client_email: clientEmail,
            private_key: privateKey
          }
        })
        await client.initialize()
        manager = { client, projectId }
        logger.info({ msg: `connected to project ${projectId}` })
      } else {
        logger.info({ msg: "oh hello there fellow dev. I'll connect using your excess permissions account" })
        const client = new SecretManagerServiceClient({ projectId })
        await client.initialize()
        manager = { client, projectId }
        logger.info({ msg: `connected to project ${projectId}` })
      }
    } catch (e) {
      logger.error({ msg: 'error initializing secret manager', error: e })
      throw Error(`error initializing secret manager: ${errorMessage(e)}`)
    }
  }
}

export async function getSecret(name: Secret): Promise<string> {
  await initializeSecretManager()
  logger.info({ msg: `fetching secret ${name}.... hold on tight (to your dreams)` })
  const [version] = await manager.client.accessSecretVersion({
    name: `projects/${manager.projectId}/secrets/${name}/versions/latest`
  })
  if (isNil(version.payload) || isNil(version.payload.data)) {
    logger.error({ msg: `secret ${name} not found` })
    throw Error(`secret ${name} not found`)
  }
  logger.info({ msg: `secret ${name} found. Delivering it...` })
  return version.payload.data.toString()
}
