import { updateUserRequestSchema } from '@echo/api/validators/update-user-request-schema'
import { z } from 'zod'

export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>
