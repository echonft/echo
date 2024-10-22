'use client'
import type { Collection } from '@echo/model/types/collection/collection'
import type { Nft } from '@echo/model/types/nft/nft'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { pathProvider } from '@echo/routing/path-provider'
import { BottomBarLayout } from '@echo/ui/components/base/layout/bottom-bar-layout'
import { TraitFilterPanel } from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { SelectableNfts } from '@echo/ui/components/nft/selectable/selectable-nfts'
import { NftAction } from '@echo/ui/constants/nft-actions'
import { useNfts } from '@echo/ui/hooks/use-nfts'
import { CollectionItemsButton } from '@echo/ui/pages/collection/collection-items-button'
import { TabPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  collection: Collection
  nfts: OwnedNft[]
  show?: boolean
}

export const CollectionItemsPanel: FunctionComponent<Props> = ({ collection, nfts, show }) => {
  const router = useRouter()
  const { filteredByNfts, selection, toggleTraitFilterSelection, selectNft, unselectNft } = useNfts({
    nfts,
    sortBy: 'owner'
  })
  function onCreateListing() {
    router.push(pathProvider.listing.new.get({ target: collection }))
  }
  function onCreateOffer(nft?: Nft) {
    if (isNil(nft)) {
      router.push(pathProvider.offer.new.get({ items: selection.nfts }))
    } else {
      router.push(pathProvider.offer.new.get({ items: nft }))
    }
  }

  if (show) {
    const count = selection.nfts.length
    const action = count > 0 ? NftAction.Offer : NftAction.Listing
    return (
      <TabPanel className={clsx('outline-none', 'pb-20')}>
        <NftsAndFiltersLayout>
          <NftFiltersPanelsLayout>
            <TraitFilterPanel
              nfts={nfts}
              selection={selection.traitFilters}
              onToggleSelection={toggleTraitFilterSelection}
            />
          </NftFiltersPanelsLayout>
          <SelectableNfts
            nfts={filteredByNfts.byTraits}
            selection={selection.nfts}
            action={NftAction.Offer}
            onAction={onCreateOffer}
            onSelect={selectNft}
            onUnselect={unselectNft}
          />
        </NftsAndFiltersLayout>
        <BottomBarLayout>
          <CollectionItemsButton
            action={action}
            count={count}
            onClick={() => {
              if (action === NftAction.Offer) {
                onCreateOffer()
              } else {
                onCreateListing()
              }
            }}
          />
        </BottomBarLayout>
      </TabPanel>
    )
  }
  return null
}
