'use client'
import { type Nft } from '@echo/model/types/nft'
import { TraitFilterPanel } from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { SelectableNfts } from '@echo/ui/components/nft/selectable/selectable-nfts'
import { NFT_ACTION_LISTING, NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import { getNewListingPathFromTarget } from '@echo/ui/helpers/listing/get-new-listing-path-from-target'
import { getByTraitsNftFilter } from '@echo/ui/helpers/nft/filters/get-by-traits-nft-filter'
import { getNewOfferPath } from '@echo/ui/helpers/offer/get-new-offer-path'
import { useSelectableNfts } from '@echo/ui/hooks/use-selectable-nfts'
import { CollectionNftsButton } from '@echo/ui/pages/collection/nfts/collection-nfts-button'
import { CollectionNftsEmpty } from '@echo/ui/pages/collection/nfts/collection-nfts-empty'
import type { Selectable } from '@echo/ui/types/selectable'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { isEmpty, isNil, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  slug: string
}

export const CollectionNfts: FunctionComponent<Props> = ({ nfts, slug }) => {
  const router = useRouter()
  const { filteredByNfts, setByTraitsFilter, selection, select, unselect } = useSelectableNfts({
    nfts,
    sortBy: 'owner'
  })
  const onCreateListing = () => {
    router.push(getNewListingPathFromTarget(slug))
  }

  const onCreateOffer = (nft?: Selectable<Nft>) => {
    if (isNil(nft)) {
      router.push(getNewOfferPath(selection))
    } else {
      router.push(getNewOfferPath(nft))
    }
  }

  if (isEmpty(nfts)) {
    return <CollectionNftsEmpty />
  }

  const count = selection.length
  const action = count > 0 ? NFT_ACTION_OFFER : NFT_ACTION_LISTING
  return (
    <div className={clsx('w-full', 'h-max')}>
      <NftsAndFiltersLayout>
        <NftFiltersPanelsLayout>
          <CollectionNftsButton
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
          <TraitFilterPanel nfts={nfts} onSelectionUpdate={pipe(getByTraitsNftFilter, setByTraitsFilter)} />
        </NftFiltersPanelsLayout>
        <SelectableNfts
          nfts={filteredByNfts.byTraits}
          selection={selection}
          action={NFT_ACTION_OFFER}
          onAction={onCreateOffer}
          onSelect={select}
          onUnselect={unselect}
        />
      </NftsAndFiltersLayout>
    </div>
  )
}
