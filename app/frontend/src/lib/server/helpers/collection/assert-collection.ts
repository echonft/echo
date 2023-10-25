import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { type Collection } from '@echo/model/types/collection'
import { isNil } from 'ramda'

export function assertCollection(collection: Collection | undefined): asserts collection is NonNullable<Collection> {
  if (isNil(collection)) {
    throw new BadRequestError('collection is nil')
  }
}
