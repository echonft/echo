'use client'
import { NftResponse } from '@echo/api/types/responses/model/nft-response'
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
  nft: Nft | NftResponse
  hideOwner?: boolean
}

export const NftThumbnail: FunctionComponent<Props> = ({ nft, hideOwner }) => {
  const { tokenId, thumbnailUrl, owner, collection, openSeaUrl } = nft
  const name = getNftName(nft)
  return (
    <InternalLink className={'outline-none'} path={links.collection.nft(collection.slug, tokenId)}>
      <div className={clsx('rounded-2xl', 'w-52', 'h-max', 'overflow-clip')}>
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
