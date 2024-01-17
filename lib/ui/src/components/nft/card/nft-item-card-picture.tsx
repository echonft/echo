import type { ListingState } from '@echo/model/types/listing-state'
import type { Nft } from '@echo/model/types/nft'
import type { OfferState } from '@echo/model/types/offer-state'
import { Img } from '@echo/ui/components/base/img'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { NftCardPictureLayout } from '@echo/ui/components/nft/card/layout/nft-card-picture-layout'
import { NftCardDiscordTag } from '@echo/ui/components/nft/card/nft-card-discord-tag'
import { NftItemCardStatus } from '@echo/ui/components/nft/card/nft-item-card-status'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
  status: OfferState | ListingState
  hideOwner?: boolean
  expired?: boolean
}

export const NftItemCardPicture: FunctionComponent<Props> = ({ nft, hideOwner, status, expired }) => {
  return (
    <NftCardPictureLayout>
      <Img
        className={clsx(
          'select-none',
          'rounded-2xl',
          'transition-transform',
          'group-hover:scale-125',
          'w-full',
          'h-full',
          'object-center',
          'object-contain'
        )}
        src={nft.pictureUrl}
        alt={nft.tokenId.toString()}
        width={200}
        height={200}
      />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <div className={clsx('flex', 'flex-row', 'items-center', 'justify-center', 'gap-1.25')}>
          <HideIf condition={Boolean(hideOwner)}>
            <NftCardDiscordTag nft={nft} />
          </HideIf>
          <NftItemCardStatus status={status} expired={expired} />
        </div>
      </div>
    </NftCardPictureLayout>
  )
}
