import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import { SelectableNftCardPictureDiscordTag } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-picture-discord-tag'
import { SelectableNftCardPictureOpenSeaIcon } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-picture-open-sea-icon'
import { SelectableNftCardSelector } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-selector'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { type FunctionComponent } from 'react'

interface Props {
  nft: SelectableNft
  hideOwner?: boolean
  hideLink?: boolean
}

export const SelectableNftCardPicture: FunctionComponent<Props> = ({ nft, hideOwner, hideLink }) => {
  const { disabled, selected } = nft
  return (
    <CardPictureLayout>
      <CardImage
        src={nft.pictureUrl}
        alt={nft.tokenId.toString()}
        scaleDisabled={Boolean(disabled) || Boolean(selected)}
      />
      <SelectableNftCardSelector nft={nft} />
      <SelectableNftCardPictureOpenSeaIcon hideLink={hideLink} nft={nft} />
      <SelectableNftCardPictureDiscordTag hideOwner={hideOwner} nft={nft} />
    </CardPictureLayout>
  )
}
