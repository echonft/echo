import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { intStringSchema } from '@echo/model/validators/int-string-schema'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { always, applySpec, assoc, isNil, pick, pipe, prop, toLower, unless } from 'ramda'
import { number, object, string } from 'zod'

export const discordProfileSchema = object({
  avatar: string().optional().nullable(),
  discriminator: intStringSchema.or(number()),
  global_name: string().optional().nullable(),
  id: string().min(1),
  username: string().min(1)
}).transform<UserDocument>((data) => {
  function avatarUrl(args: Pick<typeof data, 'id' | 'avatar' | 'discriminator'>): string {
    if (isNilOrEmpty(args.avatar)) {
      const defaultAvatarNumber = args.discriminator % 5
      return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
    }
    const format = args.avatar.startsWith('a_') ? 'gif' : 'png'
    return `https://cdn.discordapp.com/avatars/${args.id}/${args.avatar}.${format}`
  }

  return applySpec<UserDocument>({
    username: pipe(prop('username'), toLower),
    discord: pipe(
      applySpec<UserDocument['discord']>({
        avatarUrl: pipe(pick(['id', 'avatar', 'discriminator']), avatarUrl),
        id: prop('id'),
        username: prop('username')
      }),
      unless<UserDocument['discord'], UserDocument['discord']>(
        always(isNil(data.global_name)),
        assoc('globalName', data.global_name)
      )
    )
  })(data)
})
