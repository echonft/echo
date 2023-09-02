import { queryContraintFieldSchema } from './query-contraint-field-schema'
import { queryContraintOrderByDirectionSchema } from './query-contraint-order-by-direction-schema'
import { z } from 'zod'

export const queryContraintOrderBySchema = z.tuple([queryContraintFieldSchema, queryContraintOrderByDirectionSchema])
