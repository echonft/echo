import { CardDiscordTag } from '@echo/ui/components/base/card/card-discord-tag'
import type { SelectableNftCardProps } from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent } from 'react'

export const SelectableNftCardPictureDiscordTag: FunctionComponent<Pick<SelectableNftCardProps, 'nft' | 'options'>> = ({
  nft,
  options
}) => {
  if (options?.owner?.hide) {
    return null
  }
  return (
    <div className={classes('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
      <CardDiscordTag username={nft.owner.discord.username} asLink={true} />
    </div>
  )
}
