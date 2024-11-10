import { clsx } from 'clsx'
import { type FunctionComponent, type MouseEventHandler, type PropsWithChildren } from 'react'

interface Props {
  onClick?: MouseEventHandler
}

export const LoginDiscordButton: FunctionComponent<PropsWithChildren<Props>> = ({ onClick, children }) => {
  return (
    <button
      className={clsx('btn-auth')}
      onClick={(event) => {
        onClick?.(event)
      }}
    >
      {children}
    </button>
  )
}
