import type { User } from '@echo/model/types/user'
import { CardDiscordTagWrapper } from '@echo/ui/components/base/card/card-discord-tag-wrapper'
import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  owner: User
  asLink?: boolean
}

export const CardDiscordTag: FunctionComponent<Props> = ({ owner, asLink }) => {
  const label = owner.discord.globalName ?? owner.discord.username
  return (
    <CardDiscordTagWrapper username={owner.username} asLink={asLink}>
      <div
        className={clsx(
          'flex',
          'flex-row',
          'items-center',
          'bg-purple-500',
          'rounded-lg',
          'gap-1.25',
          'px-1.25',
          'py-0.75',
          'text-white'
        )}
      >
        <DiscordIconSvg width={12} />
        <span className={clsx('font-inter', 'text-[0.625rem]', 'font-medium', 'leading-[220%]')}>{label}</span>
      </div>
    </CardDiscordTagWrapper>
  )
}
