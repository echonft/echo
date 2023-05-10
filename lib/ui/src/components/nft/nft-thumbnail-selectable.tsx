import { NftThumbnailFlagIcon } from './nft-thumbnail-flag-icon'
import { NftThumbnailMakeOfferButton } from './nft-thumbnail-make-offer-button'
import { NftThumbnailOwner } from './nft-thumbnail-owner'
import { NftThumbnailPicture } from './nft-thumbnail-picture'
import { NftThumbnailSelector } from './nft-thumbnail-selector'
import { NftThumbnailTitle } from './nft-thumbnail-title'
import { clsx } from 'clsx'
import { FunctionComponent, MouseEventHandler } from 'react'

export interface NftThumbnailSelectableProps {
  pictureUrl: string
  owner: string
  name: string
  tokenId: bigint
  flagged?: boolean
  selected?: boolean
  onToggleSelection?: (selected: boolean) => unknown
  onMakeOffer?: MouseEventHandler
}

export const NftThumbnailSelectable: FunctionComponent<NftThumbnailSelectableProps> = ({
  pictureUrl,
  owner,
  name,
  tokenId,
  flagged,
  selected,
  onToggleSelection,
  onMakeOffer
}) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'rounded-2xl',
        'w-max',
        'h-max',
        'border',
        'border-solid',
        selected ? 'border-yellow-500' : 'border-transparent'
      )}
    >
      <div className={'relative'}>
        <NftThumbnailPicture name={name} src={pictureUrl} />
        <NftThumbnailFlagIcon flagged={flagged} />
        <NftThumbnailSelector selected={selected} onToggleSelection={onToggleSelection} />
        <NftThumbnailOwner owner={owner} />
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-2', 'rounded-b-2xl', 'bg-white/[0.08]', 'w-full', 'p-2')}>
        <NftThumbnailTitle name={name} tokenId={tokenId} />
        <NftThumbnailMakeOfferButton onClick={onMakeOffer} />
      </div>
    </div>
  )
}
