import { isCI } from '@echo/utils/constants/is-ci'
import { isDev } from '@echo/utils/constants/is-dev'
import { isTest } from '@echo/utils/constants/is-test'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { getGCloudProjectId } from '@echo/utils/helpers/get-gcloud-project-id'
import type { Nullable } from '@echo/utils/types/nullable'
import type { Secret } from '@echo/utils/types/secret'
import type { WithLogger, WithLoggerType } from '@echo/utils/types/with-logger'
import { privateKeySchema } from '@echo/utils/validators/private-key-schema'
import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
import type { Logger } from 'pino'
import { __, andThen, assoc, isNil, map, mergeAll, objOf, pipe, prop } from 'ramda'

interface Credentials {
  clientEmail: string
  privateKey: string
}

interface AccessSecretArgs extends WithLogger {
  name: Secret
  client: Nullable<SecretManagerServiceClient>
  projectId: string
}

function noCredentials() {
  return isDev || (!isCI && isTest)
}

function getCredentials(logger?: Nullable<Logger>): Nullable<Credentials> {
  const clientEmail = process.env.SECRET_MANAGER_EMAIL
  if (isNilOrEmpty(clientEmail)) {
    logger?.error('SECRET_MANAGER_EMAIL env not set')
    return undefined
  }
  const privateKey = privateKeySchema.parse(process.env.SECRET_MANAGER_PRIVATE_KEY)
  if (isNilOrEmpty(privateKey)) {
    logger?.error('SECRET_MANAGER_PRIVATE_KEY env not set')
    return undefined
  }
  return { clientEmail, privateKey }
}

async function connect(args: WithLoggerType<Record<'projectId', string>>) {
  const { projectId, logger } = args
  try {
    if (noCredentials()) {
      logger?.info('connecting without credentials')
      const client = new SecretManagerServiceClient({ projectId })
      await client.initialize()
      logger?.info('connected')
      return client
    } else {
      const credentials = getCredentials()
      if (!isNil(credentials)) {
        logger?.info('connecting using credentials')
        const { clientEmail, privateKey } = credentials
        const client = new SecretManagerServiceClient({
          projectId,
          credentials: {
            client_email: clientEmail,
            private_key: privateKey
          }
        })
        await client.initialize()
        logger?.info('connected')
        return client
      }
      logger?.fatal('credentials needed')
      return undefined
    }
  } catch (err) {
    logger?.fatal({ err }, 'error initializing secret manager')
    return undefined
  }
}

async function disconnect(client: Nullable<SecretManagerServiceClient>) {
  if (!isNil(client)) {
    await client.close()
  }
}

async function accessSecret(args: AccessSecretArgs): Promise<Record<Secret, Nullable<string>>> {
  const { client, logger, name, projectId } = args
  if (isNil(client)) {
    return objOf(name, undefined)
  }
  logger?.info(`fetching secret ${name}`)
  const [version] = await client.accessSecretVersion({
    name: `projects/${projectId}/secrets/${name}/versions/latest`
  })
  if (isNil(version.payload) || isNil(version.payload.data)) {
    logger?.error(`secret ${name} not found`)
    return objOf(name, undefined)
  }
  logger?.info(`secret ${name} found. Delivering it...`)
  return objOf(name, version.payload.data.toString())
}

async function initialize(logger?: Nullable<Logger>) {
  const projectId = getGCloudProjectId()
  const childLogger = logger?.child({ component: 'secret-manager', project_id: projectId })
  const client = await connect({ projectId, logger: childLogger })
  return { client, logger: childLogger, projectId }
}

export async function getSecret(args: WithLoggerType<Record<'name', Secret>>): Promise<Nullable<string>> {
  const { name, logger } = args
  const params = await initialize(logger)
  const secret = await pipe(assoc('name', name), accessSecret)(params)
  await disconnect(params.client)
  return prop(name, secret)
}

interface GetSecretsArgs extends WithLogger {
  names: Secret[]
}

export async function getSecrets(args: GetSecretsArgs): Promise<Record<(typeof args.names)[number], Nullable<string>>> {
  const { names, logger } = args
  const params = await initialize(logger)
  const secrets = await pipe(
    map(pipe(assoc('name', __, params), accessSecret)),
    promiseAll<Record<(typeof names)[number], Nullable<string>>>,
    andThen(mergeAll<Record<(typeof names)[number], Nullable<string>>>)
  )(names)
  await disconnect(params.client)
  return secrets
}
