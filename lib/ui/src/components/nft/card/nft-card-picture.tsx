import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import type { NftCardProps } from '@echo/ui/components/nft/card/nft-card'
import { NftCardDiscordTag } from '@echo/ui/components/nft/card/nft-card-discord-tag'
import { NftCardOpenSeaIcon } from '@echo/ui/components/nft/card/nft-card-open-sea-icon'
import { type FunctionComponent } from 'react'

export const NftCardPicture: FunctionComponent<NftCardProps> = (props) => {
  const { nft, options } = props
  return (
    <CardPictureLayout>
      <CardImage src={nft.pictureUrl} alt={nft.tokenId.toString()} scaleDisabled={options?.style?.scaleDisabled} />
      <NftCardOpenSeaIcon {...props} />
      <NftCardDiscordTag {...props} />
    </CardPictureLayout>
  )
}
