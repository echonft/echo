import { Size } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  size: Size.MD | Size.LG
}

export const CollectionTileSkeleton: FunctionComponent<Props> = ({ size }) => {
  return (
    <div
      className={clsx(
        'rounded-2xl',
        'bg-white/[0.08]',
        'animate-pulse',
        size === Size.LG && ['w-[27rem]', 'h-[27rem]'],
        size === Size.MD && ['w-[21rem]', 'h-[21rem]']
      )}
    />
  )
}
