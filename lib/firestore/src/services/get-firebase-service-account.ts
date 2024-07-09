import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { getGCloudProjectId } from '@echo/utils/helpers/get-gcloud-project-id'
import { getSecrets } from '@echo/utils/services/secret-manager'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { privateKeySchema } from '@echo/utils/validators/private-key-schema'
import type { ServiceAccount } from 'firebase-admin/app'
import { always, andThen, applySpec, isNil, modify, pipe, prop, unless } from 'ramda'

export async function getFirebaseServiceAccount(logger?: Nullable<Logger>): Promise<Required<ServiceAccount>> {
  const serviceAccount = await pipe(
    getSecrets,
    andThen(
      pipe(
        unless(
          propIsNil('FIREBASE_PRIVATE_KEY'),
          modify('FIREBASE_PRIVATE_KEY', (key) => privateKeySchema.parse(key))
        ),
        applySpec<Required<ServiceAccount>>({
          clientEmail: prop('FIREBASE_CLIENT_EMAIL'),
          privateKey: prop('FIREBASE_PRIVATE_KEY'),
          projectId: always(getGCloudProjectId())
        })
      )
    )
  )({ names: ['FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'], logger })
  if (isNil(serviceAccount.clientEmail) || isNil(serviceAccount.privateKey) || isNil(serviceAccount.projectId)) {
    logger?.error('service account not found')
    return Promise.reject(Error('service account not found'))
  }
  return serviceAccount
}
