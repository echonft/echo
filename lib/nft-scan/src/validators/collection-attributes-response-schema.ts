import { collectionAttributeResponseSchema } from '@echo/nft-scan/validators/collection-attribute-response-schema'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { propIsEmpty } from '@echo/utils/fp/prop-is-empty'
import { always, isNil, modify, pipe, reject, when } from 'ramda'
import { number, object, string } from 'zod'

// noinspection JSUnusedGlobalSymbols
export const collectionAttributesResponseSchema = object({
  attributes_name: string(),
  attributes_values: collectionAttributeResponseSchema.array(),
  total: number()
}).transform((value) => {
  if (isNilOrEmpty(value.attributes_name)) {
    return undefined
  }
  return pipe(
    modify('attributes_values', reject(isNil)),
    when(propIsEmpty('attributes_values'), always(undefined))
  )(value)
})
