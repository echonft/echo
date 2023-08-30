import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export interface BottomSliderTitleProps {
  title: string
  count?: number
}

export const BottomSliderTitle: FunctionComponent<BottomSliderTitleProps> = ({ title, count }) => (
  <div className={clsx('flex', 'items-center', 'justify-between', 'gap-2.5')}>
    <span className={clsx('prose-label-lg-semi', 'text-transparent', 'bg-main-gradient', 'bg-clip-text', 'uppercase')}>
      {title}
    </span>
    {!isNil(count) && (
      <span className={clsx('px-2', 'bg-dark-300', 'rounded-lg', 'prose-header-xs', 'text-white')}>{count}</span>
    )}
  </div>
)
