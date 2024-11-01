import { clsx } from 'clsx'
import { type FunctionComponent, type MouseEventHandler, type PropsWithChildren, useState } from 'react'

interface Props {
  onClick?: MouseEventHandler
}

export const LoginDiscordButton: FunctionComponent<PropsWithChildren<Props>> = ({ onClick, children }) => {
  const [loading, setLoading] = useState(false)
  return (
    <button
      className={clsx('btn-auth', loading && 'animate-pulse')}
      disabled={loading}
      onClick={(event) => {
        setLoading(true)
        onClick?.(event)
      }}
    >
      {children}
    </button>
  )
}
