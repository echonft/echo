import type { Collection } from '@echo/model/types/collection'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil } from 'ramda'

export function assertCollection(collection: Collection | undefined): asserts collection is NonNullable<Collection> {
  if (isNil(collection)) {
    throw new BadRequestError('collection is nil')
  }
}
