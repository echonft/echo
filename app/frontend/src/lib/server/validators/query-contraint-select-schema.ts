import { queryContraintFieldSchema } from './query-contraint-field-schema'

export const queryContraintSelectSchema = queryContraintFieldSchema.array().nonempty()
