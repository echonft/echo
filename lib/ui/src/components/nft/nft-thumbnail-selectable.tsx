import { SelectableProps } from '../../types/selectable-props'
import { HideIf } from '../utils/hide-if'
import { NftThumbnailMakeOfferButton } from './nft-thumbnail-make-offer-button'
import { NftThumbnailOwner } from './nft-thumbnail-owner'
import { NftThumbnailPicture } from './nft-thumbnail-picture'
import { NftThumbnailSelector } from './nft-thumbnail-selector'
import { NftThumbnailTitle } from './nft-thumbnail-title'
import { Nft } from '@echo/model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftThumbnailSelectableProps extends SelectableProps<string> {
  nft: Nft
  hideOwner?: boolean
  onMakeOffer?: (id: string) => unknown
}

export const NftThumbnailSelectable: FunctionComponent<NftThumbnailSelectableProps> = ({
  nft,
  hideOwner,
  selected,
  onToggleSelection,
  onMakeOffer
}) => {
  const { id, name, tokenId, thumbnailUrl, owner, collection } = nft
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
        selected ? 'border-yellow-500' : 'border-transparent'
      )}
    >
      <div className={'relative'}>
        <NftThumbnailPicture title={name} tokenId={tokenId} pictureUrl={thumbnailUrl} />
        {/*<NftThumbnailFlagIcon flagged={flagged} />*/}
        <NftThumbnailSelector
          selected={selected}
          onToggleSelection={(selected) => {
            onToggleSelection?.(id, selected)
          }}
        />
        <HideIf condition={Boolean(hideOwner)}>
          <NftThumbnailOwner owner={owner.discordUsername} />
        </HideIf>
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-2', 'rounded-b-2xl', 'bg-white/[0.08]', 'w-full', 'p-2')}>
        <NftThumbnailTitle name={name} tokenId={tokenId} collectionName={collection.name} />
        <NftThumbnailMakeOfferButton
          onClick={() => {
            onMakeOffer?.(id)
          }}
        />
      </div>
    </div>
  )
}
