import { AddIconSvg } from './svg/add-icon-svg'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  title: string
  onClick?: () => void
}

export const AddMoreButton: FunctionComponent<Props> = ({ title, onClick }) => {
  return (
    <button
      className={clsx(
        'flex',
        'flex-col',
        'rounded-2xl',
        'min-h-full',
        'w-32',
        'gap-2',
        'border',
        'border-dashed',
        'border-white/30',
        'justify-center',
        'items-center',
        'cursor-pointer'
      )}
      onClick={onClick}
    >
      <span className={clsx('bg-yellow-500', 'rounded-lg', 'p-2', 'text-black')}>
        <AddIconSvg />
      </span>
      <span className={clsx('prose-label-sm', 'text-white')}>{title}</span>
    </button>
  )
}
