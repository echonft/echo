import { CardDiscordTag } from '@echo/ui/components/base/card/card-discord-tag'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: SelectableNft
  hideOwner?: boolean
  asLink?: boolean
}

export const SelectableNftCardDiscordTag: FunctionComponent<Props> = ({ nft, hideOwner, asLink }) => {
  if (hideOwner) {
    return null
  }
  return (
    <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
      <CardDiscordTag username={nft.owner.discord.username} asLink={asLink} />
    </div>
  )
}
