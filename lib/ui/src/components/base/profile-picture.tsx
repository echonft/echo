import { clsx } from 'clsx'
import Image from 'next/image'
import { FunctionComponent } from 'react'

export interface ProfilePictureProps {
  name: string
  src: string
}

export const ProfilePicture: FunctionComponent<ProfilePictureProps> = ({ name, src }) => {
  return (
    <Image
      className={clsx('rounded-2xl', 'border-solid', 'border-3', 'border-yellow-500', 'w-40', 'h-40')}
      src={src}
      alt={name}
      width={160}
      height={160}
    />
  )
}
