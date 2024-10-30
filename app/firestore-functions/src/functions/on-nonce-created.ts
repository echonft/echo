import { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { CloudFunctionError } from '@echo/firestore-functions/constants/errors/cloud-function-error'
import { error } from '@echo/firestore-functions/constants/logger'
import { getCloudFunctionUrl } from '@echo/firestore-functions/helpers/get-cloud-function-url'
import { getFirestoreEventSnapshot } from '@echo/firestore-functions/helpers/get-firestore-event-snapshot'
import { setMaxInstances } from '@echo/firestore-functions/helpers/set-max-instances'
import type { DeleteExpiredNonceTaskArgs } from '@echo/firestore-functions/types/delete-expired-nonce-task-args'
import { CollectionPath } from '@echo/firestore/constants/collection-path'
import type { NonceDocument } from '@echo/firestore/types/model/nonce-document'
import { getFunctions } from 'firebase-admin/functions'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { isNil } from 'ramda'

export const onNonceCreated = onDocumentCreated(
  setMaxInstances({ document: `${CollectionPath.Nonces}/{id}` }),
  async (event) => {
    const snapshot = getFirestoreEventSnapshot(event)
    if (!isNil(snapshot)) {
      const queue = getFunctions().taskQueue<DeleteExpiredNonceTaskArgs>(CloudFunctionName.DeleteExpiredNonce)
      const uri = await getCloudFunctionUrl(CloudFunctionName.DeleteExpiredNonce)
      if (!isNil(uri)) {
        const nonce = snapshot.data() as NonceDocument
        try {
          await queue.enqueue(
            { id: snapshot.id },
            {
              scheduleTime: new Date(nonce.expiresAt * 1000),
              uri
            }
          )
        } catch (err) {
          error({ err, function: CloudFunctionName.DeleteExpiredNonce }, CloudFunctionError.Queue)
        }
      }
    }
  }
)
