import { SizeLG, SizeMD } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  size: typeof SizeMD | typeof SizeLG
}

export const CollectionTileSkeleton: FunctionComponent<Props> = ({ size }) => {
  return (
    <div
      className={clsx(
        'rounded-2xl',
        'bg-white/[0.08]',
        'animate-pulse',
        size === SizeLG && ['w-[27rem]', 'h-[27rem]'],
        size === SizeMD && ['w-[21rem]', 'h-[21rem]']
      )}
    />
  )
}
