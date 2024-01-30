import { ExploreIconSvg } from '@echo/ui/components/base/svg/explore-icon-svg'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  name: string
  selected?: boolean
}
export const ExploreNavigationPillSkeleton: FunctionComponent<Props> = ({ name, selected }) => {
  return (
    <div
      className={clsx(
        'w-max',
        'h-max',
        'flex',
        'flex-row',
        'gap-2.5',
        'items-center',
        'py-3',
        'px-6',
        'rounded-lg',
        selected ? 'bg-white/[0.05]' : 'bg-transparent'
      )}
    >
      <span className={clsx('prose-label-md', 'text-yellow-500', 'select-none')}>{name}</span>
      <span className={clsx('text-yellow-500')}>
        <ExploreIconSvg />
      </span>
    </div>
  )
}
