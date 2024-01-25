import { CardDiscordTag } from '@echo/ui/components/base/card/card-discord-tag'
import type { NftCardProps } from '@echo/ui/components/nft/card/nft-card'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

export const NftCardDiscordTag: FunctionComponent<NftCardProps> = ({ nft, options }) => {
  if (isNil(options) || isNil(options.style) || !options.style.hideOpenSeaLink) {
    return null
  }
  return (
    <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
      <CardDiscordTag username={nft.owner.discord.username} asLink={options?.owner?.asLink} />
    </div>
  )
}
