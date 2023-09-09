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
        'h-[2.625rem]',
        'w-max',
        'px-5',
        'py-2.5',
        'rounded-lg',
        'items-center',
        'bg-purple-500',
        'gap-2.5',
        'text-white',
        'prose-paragraph-sm'
      )}
    >
      <DiscordIconSvg width={22} />
      <span>{discordUsername}</span>
    </div>
  )
}
