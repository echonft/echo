import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export interface BottomSliderTitleProps {
  title: string
  count?: number
}

export const BottomSliderTitle: FunctionComponent<BottomSliderTitleProps> = ({ title, count }) => (
  <div className={clsx('flex', 'items-center', 'justify-between', 'gap-2.5')}>
    <span
      className={clsx(
        'prose-label-lg-semi',
        'text-transparent',
        'bg-main-gradient',
        'bg-clip-text',
        'uppercase',
        'select-none'
      )}
    >
      {title}
    </span>
    <HideIfNil
      checks={count}
      render={(count) => (
        <div className={clsx('w-7', 'h-7', 'bg-dark-300', 'rounded-lg', 'relative')}>
          <span
            className={clsx(
              'prose-header-xs',
              '!leading-7',
              'text-white',
              'absolute',
              'inset-0',
              'text-center',
              'select-none'
            )}
          >
            {count}
          </span>
        </div>
      )}
    />
  </div>
)
