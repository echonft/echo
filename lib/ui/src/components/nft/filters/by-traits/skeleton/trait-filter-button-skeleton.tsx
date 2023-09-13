import { DownCaretSvg } from '@echo/ui/components/base/svg/down-caret-svg'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const TraitFilterButtonSkeleton: FunctionComponent = () => {
  return (
    <button
      className={clsx(
        'flex',
        'flex-row',
        'justify-end',
        'items-center',
        'w-full',
        'h-max',
        'px-3',
        'py-2',
        'rounded-lg',
        'bg-white/[0.08]',
        'animate-pulse'
      )}
    >
      <span className={clsx('text-white/50')}>
        <DownCaretSvg />
      </span>
    </button>
  )
}
