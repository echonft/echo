import { DefaultUserProfilePicture } from '@echo/ui/components/base/svg/default-user-profile-picture'
import type { AuthUser } from '@echo/ui/types/model/auth-user'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  user: AuthUser
}

export const UserTagPicture: FunctionComponent<Props> = ({ user }) => {
  const { name, image } = user
  if (isNilOrEmpty(image)) {
    return <DefaultUserProfilePicture className={clsx('w-4.5', 'h-4.5', 'rounded')} width={18} height={18} />
  }
  return <img className={clsx('w-4.5', 'h-4.5', 'rounded')} src={image} alt={name} width={18} height={18} />
}
