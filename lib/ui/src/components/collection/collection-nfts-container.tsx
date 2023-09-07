import { NftThumbnailSelectable } from '../nft/nft-thumbnail-selectable'
import { Nft } from '@echo/ui-model'
import { clsx } from 'clsx'
import { isEmpty, isNil, map } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  selection?: string[]
  onToggleSelection?: (id: string, selected: boolean) => unknown
  onMakeOfferForNft?: (id: string) => unknown
}

export const CollectionNftsContainer: FunctionComponent<Props> = ({
  nfts,
  selection,
  onToggleSelection,
  onMakeOfferForNft
}) => {
  return (
    <div className={clsx('flex', 'flex-row', 'self-stretch', 'grow', 'flex-wrap', 'gap-6', 'relative')}>
      {map(
        (nft) => (
          <NftThumbnailSelectable
            key={nft.id}
            nft={nft}
            linkDisabled={!isEmpty(selection)}
            selected={!isNil(selection) && selection.includes(nft.id)}
            onToggleSelection={onToggleSelection}
            onMakeOffer={onMakeOfferForNft}
          />
        ),
        nfts
      )}
    </div>
  )
}
