'use client'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { NftThumbnailPicture } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-picture'
import { NftThumbnailTitle } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-title'
import { UserDiscordTagOffer } from '@echo/ui/components/shared/user-discord-tag-offer'
import { links } from '@echo/ui/constants/links'
import { getNftName } from '@echo/ui/helpers/nft/get-nft-name'
import type { Nft } from '@echo/ui/types/model/nft'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  nft: Nft
  hideOwner?: boolean
  linkDisabled?: boolean
}

export const NftThumbnail: FunctionComponent<Props> = ({ nft, linkDisabled, hideOwner }) => {
  const { tokenId, thumbnailUrl, owner, collection, openSeaUrl } = nft
  const name = getNftName(nft)
  return (
    <InternalLink path={links.collection.nft(nft.collection.slug, nft.tokenId)} disabled={linkDisabled}>
      <div className={clsx('rounded-2xl', 'w-52', 'h-max', 'cursor-pointer', 'overflow-clip')}>
        <div className={'relative'}>
          <NftThumbnailPicture alt={name} pictureUrl={thumbnailUrl} />
          <HideIf condition={Boolean(hideOwner)}>
            <div className={clsx('absolute', 'bottom-2', 'left-2', 'z-10')}>
              <UserDiscordTagOffer owner={owner.discord.username} />
            </div>
          </HideIf>
        </div>
        <NftThumbnailTitle tokenId={tokenId} collectionName={collection.name} openSeaUrl={openSeaUrl} />
      </div>
    </InternalLink>
  )
}
