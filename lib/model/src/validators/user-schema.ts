import type { User } from '@echo/model/types/user'
import { usernameSchema } from '@echo/model/validators/username-schema'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { always, both, dissocPath, hasPath, identity, ifElse, isNil, path, pipe, when } from 'ramda'
import { object, string } from 'zod'

export const userAugmentation = {
  discord: object({
    avatarUrl: string().url(),
    username: usernameSchema,
    globalName: string()
      .optional()
      .nullable()
      .transform(ifElse(isNil, always(undefined), identity))
  }),
  username: usernameSchema
}

const innnerUserSchema = object(userAugmentation)

export const userSchema = innnerUserSchema.transform<User>(
  when<User, User>(
    both(hasPath(['discord', 'globalName']), pipe(path(['discord', 'globalName']), isNilOrEmpty)),
    dissocPath<User>(['discord', 'globalName'])
  )
)
