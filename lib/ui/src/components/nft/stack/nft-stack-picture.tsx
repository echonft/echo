import type { Nft } from '@echo/model/types/nft'
import { Img } from '@echo/ui/components/base/img'
import { NftCardDiscordTag } from '@echo/ui/components/nft/card/nft-card-discord-tag'
import { NftCardOpenSeaIcon } from '@echo/ui/components/nft/card/nft-card-open-sea-icon'
import { NftStackPictureLayout } from '@echo/ui/components/nft/stack/layout/nft-stack-picture-layout'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
}

export const NftStackPicture: FunctionComponent<Props> = ({ nft }) => {
  return (
    <NftStackPictureLayout>
      <Img
        className={clsx('select-none', 'rounded-2xl')}
        src={nft.pictureUrl}
        alt={nft.tokenId.toString()}
        width={202}
        height={202}
      />
      <div className={clsx('absolute', 'top-2', 'left-2', 'h-max', 'w-max')}>
        <NftCardOpenSeaIcon nft={nft} />
      </div>
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <NftCardDiscordTag nft={nft} />
      </div>
    </NftStackPictureLayout>
  )
}
