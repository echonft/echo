import { CardDiscordTag } from '@echo/ui/components/base/card/card-discord-tag'
import { classes } from '@echo/ui/helpers/classes'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { type FunctionComponent } from 'react'

interface Props {
  nft: SelectableNft
  hideOwner?: boolean
}

export const SelectableNftCardPictureDiscordTag: FunctionComponent<Props> = ({ nft, hideOwner }) => {
  if (hideOwner) {
    return null
  }
  return (
    <div className={classes('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
      <CardDiscordTag username={nft.owner.discord.username} asLink={true} />
    </div>
  )
}
