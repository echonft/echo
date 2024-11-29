import { slugSchema } from '@echo/model/validators/slug-schema'
import { swapSchema } from '@echo/model/validators/swap-schema'
import { findIndex, isEmpty, isNil, propEq } from 'ramda'
import { object } from 'zod'

export const swapDetailsSearchParamsTransformSchema = object({
  swaps: swapSchema.array(),
  searchParams: object({
    swap: slugSchema.optional()
  })
}).transform(({ swaps, searchParams }) => {
  if (isEmpty(searchParams) || isNil(searchParams.swap)) {
    return undefined
  }
  const index = findIndex(propEq(searchParams.swap, 'slug'), swaps)
  if (index === -1) {
    return undefined
  }
  return index
})
