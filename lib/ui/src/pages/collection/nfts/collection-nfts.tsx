'use client'
import { type Nft } from '@echo/model/types/nft'
import { TraitFilterPanel } from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { SelectableNfts } from '@echo/ui/components/nft/selectable/selectable-nfts'
import { NFT_ACTION_LISTING, NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import { getNewListingPathFromTarget } from '@echo/ui/helpers/listing/get-new-listing-path-from-target'
import { getNewOfferPath } from '@echo/ui/helpers/offer/get-new-offer-path'
import { useNfts } from '@echo/ui/hooks/use-nfts'
import { CollectionItemsButton } from '@echo/ui/pages/collection/collection-items-button'
import { CollectionNftsEmpty } from '@echo/ui/pages/collection/nfts/collection-nfts-empty'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { isEmpty, isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  slug: string
}

export const CollectionNfts: FunctionComponent<Props> = ({ nfts, slug }) => {
  const router = useRouter()
  const { filteredByNfts, selection, toggleTraitFilterSelection, selectNft, unselectNft } = useNfts({
    nfts,
    sortBy: 'owner'
  })
  const onCreateListing = () => {
    router.push(getNewListingPathFromTarget(slug))
  }

  const onCreateOffer = (nft?: Nft) => {
    if (isNil(nft)) {
      router.push(getNewOfferPath({ items: selection.nfts }))
    } else {
      router.push(getNewOfferPath({ items: nft }))
    }
  }

  if (isEmpty(nfts)) {
    return <CollectionNftsEmpty />
  }

  const count = selection.nfts.length
  const action = count > 0 ? NFT_ACTION_OFFER : NFT_ACTION_LISTING
  return (
    <div className={clsx('w-full', 'h-max')}>
      <NftsAndFiltersLayout>
        <NftFiltersPanelsLayout>
          <CollectionItemsButton
            action={action}
            count={count}
            onClick={() => {
              if (action === NFT_ACTION_OFFER) {
                onCreateOffer()
              } else {
                onCreateListing()
              }
            }}
          />
          <TraitFilterPanel
            nfts={nfts}
            selection={selection.traitFilters}
            onToggleSelection={toggleTraitFilterSelection}
          />
        </NftFiltersPanelsLayout>
        <SelectableNfts
          nfts={filteredByNfts.byTraits}
          selection={selection.nfts}
          action={NFT_ACTION_OFFER}
          onAction={onCreateOffer}
          onSelect={selectNft}
          onUnselect={unselectNft}
        />
      </NftsAndFiltersLayout>
    </div>
  )
}
