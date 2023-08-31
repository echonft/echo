import { DiscordIconSvg } from '../base/svg/discord-icon-svg'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  discordUsername: string
}

export const UserDiscordTag: FunctionComponent<Props> = ({ discordUsername }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'h-max',
        'w-max',
        'py-0.25',
        'px-2.5',
        'rounded-lg',
        'items-center',
        'bg-purple-500',
        'gap-[0.31rem]'
      )}
    >
      <span className={clsx('text-yellow-500')}>
        <DiscordIconSvg width={22} />
      </span>
      <span
        className={clsx(
          'text-white',
          'font-inter',
          'font-bold',
          'tracking-[0.015rem]',
          'leading-[155%]',
          'text-[1.5rem]'
        )}
      >
        {discordUsername}
      </span>
    </div>
  )
}
