import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { classes } from '@echo/ui/helpers/classes'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { isNil } from 'ramda'
import type { FunctionComponent, MouseEventHandler } from 'react'

interface Props {
  title: string
  subtitle?: string
  onClick?: MouseEventHandler
}
export const Banner: FunctionComponent<Props> = ({ title, subtitle, onClick }) => {
  return (
    <div className={classes('sticky', 'top-0', 'w-full')}>
      <div
        className={classes(
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
        <span className={classes('prose-label-md', 'text-dark-500')}>{title}</span>
        <ShowIf condition={!isNilOrEmpty(subtitle)}>
          <button className={classes('group', isNil(onClick) && 'cursor-default')} onClick={onClick}>
            <span
              className={classes(
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
