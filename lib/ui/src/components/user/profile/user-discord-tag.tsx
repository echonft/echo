import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { UserDiscordTagWrapper } from '@echo/ui/components/user/profile/user-discord-tag-wrapper'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  discordUsername: string
  username?: string
}

export const UserDiscordTag: FunctionComponent<Props> = ({ username, discordUsername }) => {
  return (
    <UserDiscordTagWrapper username={username}>
      <div
        className={clsx(
          'flex',
          'flex-row',
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
    </UserDiscordTagWrapper>
  )
}
