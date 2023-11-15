import { SIZE_LG, SIZE_MD } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  size: typeof SIZE_MD | typeof SIZE_LG
}

export const CollectionTileSkeleton: FunctionComponent<Props> = ({ size }) => {
  return (
    <div
      className={clsx(
        'rounded-2xl',
        'bg-white/[0.08]',
        'animate-pulse',
        size === SIZE_LG && ['w-[27rem]', 'h-[27rem]'],
        size === SIZE_MD && ['w-[21rem]', 'h-[21rem]']
      )}
    />
  )
}
