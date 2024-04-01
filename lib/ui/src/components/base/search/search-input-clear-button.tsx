import { XIconSvg } from '@echo/ui/components/base/svg/x-icon-svg'
import { clsx } from 'clsx'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  className?: string
  onClick?: MouseEventHandler
}

export const SearchInputClearButton: FunctionComponent<Props> = ({ className, onClick }) => {
  return (
    <button className={clsx('flex', 'justify-center', 'items-center', 'w-6', 'h-6', className)} onClick={onClick}>
      <span
        className={clsx(
          'flex',
          'justify-center',
          'items-center',
          'w-4',
          'h-4',
          'rounded-full',
          'border-solid',
          'border-2',
          'border-yellow-500',
          'text-yellow-500'
        )}
      >
        <XIconSvg width={8} height={8} />
      </span>
    </button>
  )
}
