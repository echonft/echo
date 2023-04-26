import { clsx } from 'clsx'
import Image from 'next/image'
import { FunctionComponent } from 'react'

export interface UserTagProps {
  username: string
  pictureUrl: string
}

export const UserTag: FunctionComponent<UserTagProps> = ({ username, pictureUrl }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'gap-2.5',
        'rounded-lg',
        'items-center',
        'px-2.5',
        'py-1.5',
        'bg-white/[0.08]',
        'w-max'
      )}
    >
      <Image className={clsx('w-4.5', 'h-4.5', 'rounded')} src={pictureUrl} alt={''} width={18} height={18} />
      <span className={clsx('prose-label-sm-bold', 'text-yellow-400')}>{username}</span>
    </div>
  )
}
