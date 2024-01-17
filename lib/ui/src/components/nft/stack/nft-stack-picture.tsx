import type { ListingState } from '@echo/model/types/listing-state'
import type { Nft } from '@echo/model/types/nft'
import type { OfferState } from '@echo/model/types/offer-state'
import { Img } from '@echo/ui/components/base/img'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { NftCardDiscordTag } from '@echo/ui/components/nft/card/nft-card-discord-tag'
import { NftItemCardStatus } from '@echo/ui/components/nft/card/nft-item-card-status'
import { NftStackPictureLayout } from '@echo/ui/components/nft/stack/layout/nft-stack-picture-layout'
import type { NftStack } from '@echo/ui/types/nft-stack'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  stack: NftStack
  status: OfferState | ListingState
  hideOwner?: boolean
  expired?: boolean
}

export const NftStackPicture: FunctionComponent<Props> = ({ stack, hideOwner, status, expired }) => {
  return (
    <NftStackPictureLayout>
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
        src={stack.pictureUrl}
        alt={stack.tokenId.toString()}
        width={202}
        height={202}
      />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <div className={clsx('flex', 'flex-row', 'items-center', 'justify-center', 'gap-1.25')}>
          <HideIf condition={Boolean(hideOwner)}>
            <NftCardDiscordTag nft={{ owner: stack.owner } as Nft} />
          </HideIf>
          <NftItemCardStatus status={status} expired={expired} />
        </div>
      </div>
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}></div>
    </NftStackPictureLayout>
  )
}
