import { privateKeySchema } from '@echo/model/validators/private-key-schema'
import { Secret } from '@echo/utils/constants/secret'
import { gcloudProjectId } from '@echo/utils/helpers/gcloud-project-id'
import { getSecret } from '@echo/utils/services/secret-manager'
import type { ServiceAccount } from 'firebase-admin/app'
import { andThen, pipe } from 'ramda'

export async function getFirebaseServiceAccount(): Promise<Required<ServiceAccount>> {
  const clientEmail = await getSecret(Secret.FirebaseClientEmail)
  const privateKey = await pipe(
    getSecret,
    andThen((key) => privateKeySchema.parse(key))
  )(Secret.FirebasePrivateKey)

  return { clientEmail, privateKey, projectId: gcloudProjectId() }
}
