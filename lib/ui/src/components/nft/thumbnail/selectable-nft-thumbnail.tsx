'use client'
import { type Nft } from '@echo/model/types/nft'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { NftThumbnailPicture } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-picture'
import { NftThumbnailSelector } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-selector'
import { NftThumbnailTitle } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-title'
import { UserDiscordTagOffer } from '@echo/ui/components/shared/user-discord-tag-offer'
import { getNftName } from '@echo/ui/helpers/nft/get-nft-name'
import { type DisableableType } from '@echo/ui/types/disableable'
import { type SelectableType } from '@echo/ui/types/selectable'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: DisableableType<SelectableType<Nft>>
  hideOwner?: boolean
  onToggleSelection?: (nft: DisableableType<SelectableType<Nft>>) => unknown
}

export const SelectableNftThumbnail: FunctionComponent<Props> = ({ nft, hideOwner, onToggleSelection }) => {
  const { tokenId, thumbnailUrl, owner, collection, selected, disabled } = nft
  const name = getNftName(nft)
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'rounded-2xl',
        'w-52',
        'h-max',
        'border',
        'border-solid',
        'overflow-clip',
        selected ? 'border-yellow-500' : 'border-transparent',
        disabled && 'opacity-40'
      )}
    >
      <div className={'relative'}>
        <NftThumbnailPicture alt={name} pictureUrl={thumbnailUrl} disabled={disabled} />
        <HideIf condition={Boolean(disabled)}>
          <NftThumbnailSelector
            selected={selected}
            onToggleSelection={() => {
              onToggleSelection?.(nft)
            }}
          />
        </HideIf>
        <HideIf condition={Boolean(hideOwner)}>
          <div className={clsx('absolute', 'bottom-2', 'left-2', 'z-10')}>
            <UserDiscordTagOffer owner={owner.discord.username} />
          </div>
        </HideIf>
      </div>
      <NftThumbnailTitle tokenId={tokenId} collectionName={collection.name} />
    </div>
  )
}
