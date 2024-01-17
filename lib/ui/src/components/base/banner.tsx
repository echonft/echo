import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent, MouseEventHandler } from 'react'

interface Props {
  title: string
  subtitle?: string
  onClick?: MouseEventHandler
}
export const Banner: FunctionComponent<Props> = ({ title, subtitle, onClick }) => {
  return (
    <div className={clsx('sticky', 'top-0', 'w-full')}>
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
        <ShowIf condition={!isNilOrEmpty(subtitle)}>
          <button className={clsx('group', isNil(onClick) && 'cursor-default')} onClick={onClick}>
            <span
              className={clsx(
                'prose-label-md',
                'text-dark-500',
                !isNil(onClick) && [
                  'underline',
                  'group-enabled:group-active:text-white',
                  'group-enabled:group-hover:text-white'
                ]
              )}
            >
              {subtitle}
            </span>
          </button>
        </ShowIf>
      </div>
    </div>
  )
}
