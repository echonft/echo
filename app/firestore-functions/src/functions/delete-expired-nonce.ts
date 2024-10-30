import { ListingError } from '@echo/firestore-functions/constants/errors/listing-error'
import { RequestError } from '@echo/firestore-functions/constants/errors/request-error'
import { error } from '@echo/firestore-functions/constants/logger'
import { setMaxInstances } from '@echo/firestore-functions/helpers/set-max-instances'
import type { DeleteExpiredNonceTaskArgs } from '@echo/firestore-functions/types/delete-expired-nonce-task-args'
import { deleteExpiredNonceTaskArgsSchema } from '@echo/firestore-functions/validators/delete-expired-nonce-task-args-schema'
import { deleteNonce } from '@echo/firestore/crud/nonce/delete-nonce'
import { onTaskDispatched } from 'firebase-functions/v2/tasks'

export const deleteExpiredNonce = onTaskDispatched<DeleteExpiredNonceTaskArgs>(
  setMaxInstances({
    retryConfig: {
      maxAttempts: 5,
      minBackoffSeconds: 10
    },
    rateLimits: {
      maxConcurrentDispatches: 10
    }
  }),
  async (req) => {
    try {
      const { id } = deleteExpiredNonceTaskArgsSchema.parse(req.data)
      try {
        await deleteNonce(id)
      } catch (err) {
        error({ err, nonce: { id } }, ListingError.Expire)
      }
    } catch (err) {
      error({ err }, RequestError.Parse)
    }
  }
)
