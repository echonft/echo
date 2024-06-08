import { environment } from '@echo/utils/constants/environment'
import { isCI } from '@echo/utils/constants/is-ci'
import { isDev } from '@echo/utils/constants/is-dev'
import { isTest } from '@echo/utils/constants/is-test'
import { getBaseLogger } from '@echo/utils/services/pino-logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
import { and, isNil, not, or } from 'ramda'

type Secret =
  | 'ALCHEMY_API_KEY'
  | 'DISCORD_CLIENT_ID'
  | 'DISCORD_CLIENT_SECRET'
  | 'FIREBASE_CLIENT_EMAIL'
  | 'FIREBASE_PRIVATE_KEY'
const logger = getBaseLogger('Secret Manager')

let manager: {
  client: SecretManagerServiceClient
  projectId: string
}

function shouldUseCredentials() {
  return not(or(isDev, and(isTest, not(isCI))))
}

export function getProjectId() {
  switch (environment) {
    case 'production':
      return 'echo-prod-b71e2'
    case 'staging':
      return undefined
    case 'testnet':
      return 'echo-testnet'
    case 'test':
      return 'echo-test-7787f'
    case 'development':
    default:
      return 'echo-dev-fallback'
  }
}

async function initializeSecretManager() {
  if (isNil(manager)) {
    logger.info({ msg: 'initializing secret manager...' })
    if (shouldUseCredentials()) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const projectId = getProjectId()
      // TODO get the credentials
    } else {
      try {
        logger.info({ msg: "oh hello there fellow dev. I'll connect using your excess permissions account" })
        const client = new SecretManagerServiceClient({ projectId: getProjectId() })
        await client.initialize()
        const projectId = await client.getProjectId()
        manager = { client, projectId }
        logger.info({ msg: `connected to project ${projectId}` })
      } catch (e) {
        logger.error({ msg: 'error initializing secret manager', error: e })
      }
    }
  }
}

export async function getSecret(name: Secret): Promise<Nullable<string>> {
  await initializeSecretManager()
  try {
    logger.info({ msg: `fetching secret ${name}.... hold on tight (to your dreams)` })
    const [version] = await manager.client.accessSecretVersion({
      name: `projects/${manager.projectId}/secrets/${name}/versions/latest`
    })
    if (isNil(version.payload) || isNil(version.payload.data)) {
      logger.error({ msg: `secret ${name} not found` })
    }
    logger.info({ msg: `secret ${name} found. Delivering it...` })
    return version.payload?.data?.toString()
  } catch (e) {
    logger.error({ msg: `error accessing secret ${name}`, error: e })
    return undefined
  }
}
