import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import type { NftCardProps } from '@echo/ui/components/nft/card/nft-card'
import { NftCardDiscordTag } from '@echo/ui/components/nft/card/nft-card-discord-tag'
import { nftLabel } from '@echo/ui/helpers/nft/nft-label'
import { type FunctionComponent } from 'react'

export const NftCardPicture: FunctionComponent<NftCardProps> = (props) => {
  const { nft } = props
  return (
    <CardPictureLayout>
      <CardImage src={nft.pictureUrl} alt={nftLabel(nft)} />
      <NftCardDiscordTag {...props} />
    </CardPictureLayout>
  )
}
