import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type MouseEventHandler, type PropsWithChildren, useState } from 'react'

interface Props {
  onClick?: MouseEventHandler
}

export const LoginButton: FunctionComponent<PropsWithChildren<Props>> = ({ onClick, children }) => {
  const [loading, setLoading] = useState(false)
  return (
    <button
      className={classes(
        'btn',
        'group',
        '!rounded-md',
        'bg-neutral-700',
        'pt-3',
        'pb-2.5',
        'px-4',
        'w-full',
        'enabled:hover:bg-neutral-800',
        loading && 'animate-pulse'
      )}
      disabled={loading}
      onClick={(event) => {
        setLoading(true)
        onClick?.(event)
      }}
    >
      <span className={classes('prose-label-lg', 'text-white')}>{children}</span>
    </button>
  )
}
