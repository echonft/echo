import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  open: boolean
  title: string
  subtitle?: string
  onSubtitleClick?: VoidFunction
}
export const Banner: FunctionComponent<Props> = ({ open, title, subtitle, onSubtitleClick }) => {
  return (
    <ShowIf condition={open}>
      <div
        className={clsx(
          'flex',
          'flex-row',
          'items-center',
          isNil(subtitle) ? 'justify-center' : 'justify-between',
          'px-20',
          'py-4',
          'w-full',
          'bg-green-300'
        )}
      >
        <span className={clsx('prose-label-md', 'text-dark-500')}>{title}</span>
        <ShowIf condition={!isNilOrEmpty(subtitle) && !isNil(onSubtitleClick)}>
          <button className={clsx('group')} onClick={onSubtitleClick}>
            <span
              className={clsx(
                'prose-label-md',
                'text-dark-500',
                'underline',
                'group-active:text-white',
                'group-enabled:group-hover:text-white'
              )}
            >
              {subtitle}
            </span>
          </button>
        </ShowIf>
        <ShowIf condition={!isNilOrEmpty(subtitle) && isNil(onSubtitleClick)}>
          <span className={clsx('prose-label-md', 'text-dark-500')}>{subtitle}</span>
        </ShowIf>
      </div>
    </ShowIf>
  )
}
