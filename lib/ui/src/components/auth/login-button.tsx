import clsx from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  disabled: boolean
  onClick?: VoidFunction
}

export const LoginButton: FunctionComponent<PropsWithChildren<Props>> = ({ onClick, disabled, children }) => {
  return (
    <button
      className={clsx('btn', 'group', '!rounded-md', 'bg-neutral-700', 'pt-3', 'pb-2.5', 'px-4')}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={clsx('text-label-lg', 'text-white')}>{children}</span>
    </button>
  )
}
