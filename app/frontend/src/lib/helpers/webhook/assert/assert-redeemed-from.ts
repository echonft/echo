import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import type { HexString } from '@echo/utils/types/hex-string'
import { isNil } from 'ramda'

export function assertRedeemedFrom(from: HexString | undefined): asserts from is NonNullable<HexString> {
  if (isNil(from)) {
    throw new BadRequestError('from is nil')
  }
}
