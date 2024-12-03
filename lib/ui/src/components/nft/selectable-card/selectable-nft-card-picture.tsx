import type { OwnedNft } from '@echo/model/types/nft'
import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import { SelectableNftCardPictureDiscordTag } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-picture-discord-tag'
import { nftLabel } from '@echo/ui/helpers/nft/nft-label'
import { type FunctionComponent } from 'react'

interface Props {
  nft: OwnedNft
  options?: {
    owner?: {
      hide?: boolean
    }
  }
}

export const SelectableNftCardPicture: FunctionComponent<Props> = ({ nft, options }) => {
  return (
    <CardPictureLayout>
      <CardImage src={nft.pictureUrl} alt={nftLabel(nft)} />
      <SelectableNftCardPictureDiscordTag nft={nft} options={options} />
    </CardPictureLayout>
  )
}
