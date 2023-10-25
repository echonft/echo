import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function assertTransactionId(transactionId: string | undefined): asserts transactionId is string {
  if (isNilOrEmpty(transactionId)) {
    throw Error('transactionId is required')
  }
}
