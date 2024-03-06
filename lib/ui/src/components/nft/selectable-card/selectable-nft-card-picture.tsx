import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import type { SelectableNftCardProps } from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { SelectableNftCardPictureDiscordTag } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-picture-discord-tag'
import { SelectableNftCardPictureOpenSeaIcon } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-picture-open-sea-icon'
import { type FunctionComponent } from 'react'

export const SelectableNftCardPicture: FunctionComponent<Pick<SelectableNftCardProps, 'nft' | 'options'>> = ({
  nft,
  options
}) => {
  return (
    <CardPictureLayout>
      <CardImage src={nft.pictureUrl} alt={nft.tokenId.toString()} />
      <SelectableNftCardPictureOpenSeaIcon nft={nft} />
      <SelectableNftCardPictureDiscordTag nft={nft} options={options} />
    </CardPictureLayout>
  )
}
