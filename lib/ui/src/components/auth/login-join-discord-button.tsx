import clsx from 'clsx'
import type { FunctionComponent, MouseEventHandler, PropsWithChildren } from 'react'

interface Props {
  onClick?: MouseEventHandler
}

export const LoginJoinDiscordButton: FunctionComponent<PropsWithChildren<Props>> = ({ onClick, children }) => {
  return (
    <div className={clsx('w-full', 'bg-gradient-to-r', 'from-[#FFE70B]', 'to-[#0e0e0e]', 'rounded-lg', 'p-[1px]')}>
      <button
        className={clsx(
          'bg-[#0e0e0e]',
          'rounded-lg',
          'py-5',
          'px-8',
          'w-full',
          'text-left',
          'group',
          'enabled:hover:bg-[#0e0e0e]/90'
        )}
        onClick={onClick}
      >
        <span
          className={clsx(
            'prose-header-md-semi',
            'bg-joinDiscordLabel',
            'italic',
            'bg-clip-text',
            'group-enabled:group-hover:bg-white'
          )}
        >
          {children}
        </span>
      </button>
    </div>
  )
}
