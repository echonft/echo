import { Size } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  size?: Size
  border?: boolean
}

export const ProfilePictureSkeleton: FunctionComponent<Props> = ({ size = Size.LG, border = true }) => {
  return (
    <div
      className={clsx(
        'flex-none',
        'select-none',
        size === Size.LG && ['h-40', 'w-40', 'rounded-2xl'],
        size === Size.MD && ['h-28', 'w-28', 'rounded-2xl'],
        size === Size.SM && ['h-[6.1875rem]', 'w-[5.875rem]', 'rounded-lg'],
        border && ['border-solid', 'border-3', 'border-yellow-500'],
        'bg-dark-500',
        'animate-pulse'
      )}
    />
  )
}
