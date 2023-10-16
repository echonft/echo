import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function assertSignature(signature: string | undefined): asserts signature is string {
  if (isNilOrEmpty(signature)) {
    throw Error('signature is required')
  }
}
