import { XIconSvg } from '../base/svg/x-icon-svg'
import { clsx } from 'clsx'
import { FunctionComponent, MouseEventHandler } from 'react'

interface Props {
  className?: string
  onClick?: MouseEventHandler
}

export const ClearInputButton: FunctionComponent<Props> = ({ className, onClick }) => {
  return (
    <button
      className={clsx(
        'flex',
        'justify-center',
        'items-center',
        'z-10',
        'w-4',
        'h-4',
        'rounded-full',
        'border-solid',
        'border-2',
        'border-yellow-500',
        className
      )}
      onClick={onClick}
    >
      <span className={clsx('text-yellow-500')}>
        <XIconSvg width={8} height={8} />
      </span>
    </button>
  )
}
