import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { getSecrets } from '@echo/utils/services/secret-manager'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { privateKeySchema } from '@echo/utils/validators/private-key-schema'
import type { ServiceAccount } from 'firebase-admin/app'
import { andThen, applySpec, isNil, modify, pipe, prop, unless } from 'ramda'

export async function getFirebaseCredentials(logger?: Nullable<Logger>): Promise<Omit<ServiceAccount, 'projectId'>> {
  const { clientEmail, privateKey } = await pipe(
    getSecrets,
    andThen(
      pipe(
        unless(
          propIsNil('FIREBASE_PRIVATE_KEY'),
          modify('FIREBASE_PRIVATE_KEY', (key) => privateKeySchema.parse(key))
        ),
        applySpec<Omit<ServiceAccount, 'projectId'>>({
          clientEmail: prop('FIREBASE_CLIENT_EMAIL'),
          privateKey: prop('FIREBASE_PRIVATE_KEY')
        })
      )
    )
  )(['FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'], logger)
  if (isNil(clientEmail) || isNil(privateKey)) {
    throw Error(`credentials not found`)
  }
  return { clientEmail, privateKey }
}
