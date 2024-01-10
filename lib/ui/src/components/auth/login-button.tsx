import clsx from 'clsx'
import type { FunctionComponent, MouseEventHandler, PropsWithChildren } from 'react'

interface Props {
  onClick?: MouseEventHandler
}

export const LoginButton: FunctionComponent<PropsWithChildren<Props>> = ({ onClick, children }) => {
  return (
    <button
      className={clsx(
        'btn',
        'group',
        '!rounded-md',
        'bg-neutral-700',
        'pt-3',
        'pb-2.5',
        'px-4',
        'w-full',
        'enabled:hover:bg-neutral-800'
      )}
      onClick={onClick}
    >
      <span className={clsx('prose-label-lg', 'text-white')}>{children}</span>
    </button>
  )
}
