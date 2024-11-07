import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { always, otherwise, pipe } from 'ramda'

export function otherwiseEmptyArray<T>(promise: Promise<T[]>): Promise<T[]> {
  return otherwise<T[]>(pipe(captureAndLogError, always([])), promise)
}
