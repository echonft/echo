import type { Nft } from '@echo/model/types/nft'
import { Img } from '@echo/ui/components/base/img'
import { NftCardPictureLayout } from '@echo/ui/components/nft/card/layout/nft-card-picture-layout'
import { NftCardDiscordTag } from '@echo/ui/components/nft/card/nft-card-discord-tag'
import { NftCardOpenSeaIcon } from '@echo/ui/components/nft/card/nft-card-open-sea-icon'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
}

export const NftCardPicture: FunctionComponent<Props> = ({ nft }) => {
  return (
    <NftCardPictureLayout>
      <Img className={clsx('select-none')} src={nft.pictureUrl} alt={nft.tokenId.toString()} width={208} height={208} />
      <div className={clsx('absolute', 'top-2', 'left-2', 'h-max', 'w-max')}>
        <NftCardOpenSeaIcon nft={nft} />
      </div>
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <NftCardDiscordTag nft={nft} />
      </div>
    </NftCardPictureLayout>
  )
}
