import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, otherwise, pipe } from 'ramda'

export function otherwiseUndefined<T>(promise: Promise<Nullable<T>>): Promise<Nullable<T>> {
  return otherwise<Nullable<T>>(pipe(captureAndLogError, always(undefined)), promise)
}
