import { type AuthUser } from '@echo/model/types/auth-user'
import { clsx } from 'clsx'
import Image from 'next/image'
import { type FunctionComponent } from 'react'

interface Props {
  user: AuthUser
}

export const UserTagPicture: FunctionComponent<Props> = ({ user }) => {
  const { username, discord } = user
  return (
    <Image
      className={clsx('w-4.5', 'h-4.5', 'rounded')}
      src={discord.avatarUrl}
      alt={username}
      width={18}
      height={18}
      quality={100}
    />
  )
}
