'use client'
import { links } from '../../../constants/links'
import { SelectableProps } from '../../../types/selectable-props'
import { InternalLink } from '../../base/link/internal-link'
import { HideIf } from '../../base/utils/hide-if'
import { UserDiscordTagOffer } from '../../shared/user-discord-tag-offer'
import { NftThumbnailPicture } from './nft-thumbnail-picture'
import { NftThumbnailSelector } from './nft-thumbnail-selector'
import { NftThumbnailTitle } from './nft-thumbnail-title'
import { Nft } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props extends SelectableProps<string> {
  nft: Nft
  linkDisabled?: boolean
  hideOwner?: boolean
}

export const NftThumbnailSelectable: FunctionComponent<Props> = ({
  nft,
  linkDisabled,
  hideOwner,
  selected,
  onToggleSelection
}) => {
  const { id, name, tokenId, thumbnailUrl, owner, collection } = nft
  return (
    <InternalLink
      className={clsx('h-max')}
      path={links.nft.nftLink(collection.slug, tokenId)}
      disabled={linkDisabled}
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
          selected ? 'border-yellow-500' : 'border-transparent',
          'overflow-clip'
        )}
      >
        <div className={'relative'}>
          <NftThumbnailPicture alt={name} pictureUrl={thumbnailUrl} />
          <NftThumbnailSelector
            selected={selected}
            onToggleSelection={(selected) => {
              onToggleSelection?.(id, selected)
            }}
          />

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
