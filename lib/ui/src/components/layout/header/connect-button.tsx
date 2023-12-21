import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  loading?: boolean
  onClick?: VoidFunction
}

export const ConnectButton: FunctionComponent<Props> = ({ loading = false, onClick }) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={clsx('btn-primary', 'group', 'w-[1.875rem]', 'h-[1.875rem]', loading && 'animate-pulse')}
    >
      <span className={clsx('btn-label-primary')}>
        <DiscordIconSvg />
      </span>
    </button>
  )
}
