import type { Nft } from '@echo/model/types/nft'
import { Img } from '@echo/ui/components/base/img'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { NftCardPictureLayout } from '@echo/ui/components/nft/card/layout/nft-card-picture-layout'
import { NftCardDiscordTag } from '@echo/ui/components/nft/card/nft-card-discord-tag'
import { NftCardOpenSeaIcon } from '@echo/ui/components/nft/card/nft-card-open-sea-icon'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
  hideOwner?: boolean
  hideLink?: boolean
}

export const NftCardPicture: FunctionComponent<Props> = ({ nft, hideOwner, hideLink }) => {
  return (
    <NftCardPictureLayout>
      <Img
        className={clsx('select-none', 'rounded-2xl')}
        src={nft.pictureUrl}
        alt={nft.tokenId.toString()}
        width={200}
        height={200}
      />
      <HideIf condition={Boolean(hideLink)}>
        <div className={clsx('absolute', 'top-2', 'left-2', 'h-max', 'w-max')}>
          <NftCardOpenSeaIcon nft={nft} />
        </div>
      </HideIf>
      <HideIf condition={Boolean(hideOwner)}>
        <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
          <NftCardDiscordTag nft={nft} />
        </div>
      </HideIf>
    </NftCardPictureLayout>
  )
}
