import type { Nft } from '@echo/model/types/nft'
import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
}

export const NftCardDiscordTag: FunctionComponent<Props> = ({ nft }) => {
  return (
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
      <span className={clsx('font-inter', 'text-[0.625rem]', 'font-medium', 'leading-[220%]')}>
        {nft.owner.discord.username}
      </span>
    </div>
  )
}
