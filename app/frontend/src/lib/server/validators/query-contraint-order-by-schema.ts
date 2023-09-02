import { queryContraintOrderByDirectionSchema } from './query-contraint-order-by-direction-schema'
import { OrderByParameters } from '@echo/firestore-types'
import { applySpec, head, last } from 'ramda'
import { z } from 'zod'

export const queryContraintOrderBySchema = z
  .tuple([z.string().nonempty(), queryContraintOrderByDirectionSchema])
  .transform(
    applySpec<OrderByParameters>({
      field: head,
      direction: last
    })
  )
