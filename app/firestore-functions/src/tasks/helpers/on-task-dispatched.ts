import { setMaxInstances } from '@echo/firestore-functions/helpers/set-max-instances'
import { onTaskDispatched as firebaseOnTaskDispatched, type Request } from 'firebase-functions/v2/tasks'

export function onTaskDispatched<T>(handler: (data: T) => void | Promise<void>) {
  const opts = setMaxInstances({
    retryConfig: {
      maxAttempts: 5,
      minBackoffSeconds: 10
    },
    rateLimits: {
      maxConcurrentDispatches: 10
    }
  })
  return firebaseOnTaskDispatched(opts, (request: Request<T>) => handler(request.data))
}
