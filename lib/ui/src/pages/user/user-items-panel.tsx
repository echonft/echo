'use client'
import type { OwnedNft } from '@echo/model/types/nft'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { CollectionFilterPanel } from '@echo/ui/components/nft/filters/by-collection/collection-filter-panel'
import { TraitFilterPanelVisibilityManager } from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel-visibility-manager'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { NftsWithFilters } from '@echo/ui/components/nft/filters/nfts-with-filters'
import { SelectableNftCards } from '@echo/ui/components/nft/selectable-card/selectable-nft-cards'
import { NftAction } from '@echo/ui/constants/nft-actions'
import { useNfts } from '@echo/ui/hooks/use-nfts'
import { UserItemsBottomBar } from '@echo/ui/pages/user/user-items-bottom-bar'
import { TabPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { isNil, type NonEmptyArray } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  isAuthUser: boolean
  nfts: OwnedNft[]
  show?: boolean
}

export const UserItemsPanel: FunctionComponent<Props> = ({ isAuthUser, nfts, show }) => {
  const router = useRouter()
  const action = NftAction.Offer
  const {
    filteredByNfts,
    selection,
    toggleTraitFilterSelection,
    toggleCollectionFilterSelection,
    selectNft,
    unselectNft
  } = useNfts({
    nfts,
    sortBy: 'collection'
  })

  if (show) {
    if (isAuthUser) {
      return (
        <TabPanel className={clsx('outline-none')}>
          <NftsWithFilters nfts={nfts} sortBy={'collection'} options={{ owner: { hide: true } }} />
        </TabPanel>
      )
    }
    return (
      <TabPanel>
        <div className={clsx('w-full', 'h-max')}>
          <NftsAndFiltersLayout>
            <NftFiltersPanelsLayout>
              <CollectionFilterPanel
                nfts={nfts}
                selection={selection.collectionFilter}
                onToggleSelection={toggleCollectionFilterSelection}
              />
              <AnimatePresence>
                <TraitFilterPanelVisibilityManager
                  show={!isNil(selection.collectionFilter)}
                  nfts={filteredByNfts.byCollection}
                  selection={selection.traitFilters}
                  onToggleSelection={toggleTraitFilterSelection}
                />
              </AnimatePresence>
            </NftFiltersPanelsLayout>
            <SelectableNftCards
              nfts={filteredByNfts.byTraits}
              selection={selection.nfts}
              action={action}
              onAction={(nft) => {
                router.push(frontendRoutes.offer.create.withQuery({ items: [nft] as NonEmptyArray<OwnedNft> }).get())
              }}
              onSelect={selectNft}
              onUnselect={unselectNft}
            />
          </NftsAndFiltersLayout>
          <UserItemsBottomBar selection={selection.nfts} />
        </div>
      </TabPanel>
    )
  }
  return null
}
