'use client'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { NftThumbnailPicture } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-picture'
import { NftThumbnailSelector } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-selector'
import { NftThumbnailTitle } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-title'
import { UserDiscordTagOffer } from '@echo/ui/components/shared/user-discord-tag-offer'
import { links } from '@echo/ui/constants/links'
import type { Nft } from '@echo/ui/types/model/nft'
import type { SelectableProps } from '@echo/ui/types/selectable-props'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props extends SelectableProps<string> {
  nft: Nft
  linkDisabled?: boolean
  hideOwner?: boolean
  disabled?: boolean
}

export const SelectableNftThumbnail: FunctionComponent<Props> = ({
  nft,
  linkDisabled,
  hideOwner,
  selected,
  disabled,
  onToggleSelection
}) => {
  const { id, name, tokenId, thumbnailUrl, owner, collection } = nft

  if (selected && disabled) {
    throw Error('Selectable NFTs cant be selected when disabled')
  }

  return (
    <InternalLink
      className={clsx('h-max')}
      path={links.collection.nft(collection.slug, tokenId)}
      disabled={disabled || linkDisabled}
      onClick={() => {
        if (linkDisabled) {
          onToggleSelection?.(id, !selected)
        }
      }}
    >
      <div
        className={clsx(
          'flex',
          'flex-col',
          'rounded-2xl',
          'w-52',
          'h-max',
          'border',
          'border-solid',
          'cursor-pointer',
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
              onToggleSelection={(selected) => {
                onToggleSelection?.(id, selected)
              }}
            />
          </HideIf>
          <HideIf condition={Boolean(hideOwner)}>
            <div className={clsx('absolute', 'bottom-2', 'left-2', 'z-10')}>
              <UserDiscordTagOffer owner={owner.discordUsername} />
            </div>
          </HideIf>
        </div>
        <div className={clsx('flex', 'flex-col', 'bg-white/[0.08]', 'w-full', 'p-2')}>
          <NftThumbnailTitle tokenId={tokenId} collectionName={collection.name} />
        </div>
      </div>
    </InternalLink>
  )
}
