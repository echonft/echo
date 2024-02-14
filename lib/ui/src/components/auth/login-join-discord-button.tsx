import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent, MouseEventHandler, PropsWithChildren } from 'react'

interface Props {
  onClick?: MouseEventHandler
}

export const LoginJoinDiscordButton: FunctionComponent<PropsWithChildren<Props>> = ({ onClick, children }) => {
  return (
    <div className={classes('w-full', 'bg-gradient-to-r', 'from-[#FFE70B]', 'to-[#0e0e0e]', 'rounded-lg', 'p-[1px]')}>
      <button
        className={classes(
          'bg-[#0e0e0e]',
          'rounded-lg',
          'py-5',
          'px-8',
          'w-full',
          'text-left',
          'group',
          'enabled:hover:bg-[#1f1e1e]'
        )}
        onClick={onClick}
      >
        <span className={classes('prose-header-md-semi', 'bg-joinDiscordLabel', 'italic', 'bg-clip-text')}>
          {children}
        </span>
      </button>
    </div>
  )
}
