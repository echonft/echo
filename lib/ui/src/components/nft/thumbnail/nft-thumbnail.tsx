'use client'
import { links } from '../../../constants/links'
import { InternalLink } from '../../base/link/internal-link'
import { HideIf } from '../../base/utils/hide-if'
import { UserDiscordTagOffer } from '../../shared/user-discord-tag-offer'
import { NftThumbnailPicture } from './nft-thumbnail-picture'
import { NftThumbnailTitle } from './nft-thumbnail-title'
import { Nft } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  nft: Nft
  hideOwner?: boolean
  linkDisabled?: boolean
}

export const NftThumbnail: FunctionComponent<Props> = ({ nft, linkDisabled, hideOwner }) => {
  const { name, tokenId, thumbnailUrl, owner, collection } = nft
  return (
    <InternalLink path={links.nft.nftLink(nft.collection.slug, nft.tokenId)} disabled={linkDisabled}>
      <div className={clsx('flex', 'flex-col', 'rounded-2xl', 'w-52', 'h-max', 'cursor-pointer', 'overflow-clip')}>
        <div className={'relative'}>
          <NftThumbnailPicture alt={name} pictureUrl={thumbnailUrl} />
          <HideIf condition={Boolean(hideOwner)}>
            <div className={clsx('absolute', 'bottom-2', 'left-2', 'z-10')}>
              <UserDiscordTagOffer owner={owner.discordUsername} />
            </div>
          </HideIf>
        </div>
        <div className={clsx('flex', 'flex-col', 'gap-2', 'bg-white/[0.08]', 'w-full', 'p-2')}>
          <NftThumbnailTitle tokenId={tokenId} collectionName={collection.name} />
        </div>
      </div>
    </InternalLink>
  )
}
