import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { clsx } from 'clsx'
import type { FunctionComponent, MouseEventHandler } from 'react'

interface Props {
  loading?: boolean
  onClick?: MouseEventHandler
}

export const ConnectButton: FunctionComponent<Props> = ({ loading = false, onClick }) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={clsx(
        'btn-primary',
        'group',
        'w-[1.875rem]',
        'h-[1.875rem]',
        '!enabled:hover:bg-yellow-500',
        loading && 'animate-pulse'
      )}
    >
      <span className={clsx('btn-label-primary')}>
        <DiscordIconSvg />
      </span>
    </button>
  )
}
