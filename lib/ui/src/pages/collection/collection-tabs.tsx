'use client'
import type { Nft } from '@echo/model/types/nft'
import type { Swap } from '@echo/model/types/swap'
import { ListingsPanel } from '@echo/ui/components/base/navigation/panels/listings-panel'
import { OffersPanel } from '@echo/ui/components/base/navigation/panels/offers-panel'
import { SwapsPanel } from '@echo/ui/components/base/navigation/panels/swaps-panel'
import { ItemsTab } from '@echo/ui/components/base/navigation/tabs/items-tab'
import { ListingsTab } from '@echo/ui/components/base/navigation/tabs/listings-tab'
import { OffersTab } from '@echo/ui/components/base/navigation/tabs/offers-tab'
import { SwapsTab } from '@echo/ui/components/base/navigation/tabs/swaps-tab'
import { CollectionItemsPanel } from '@echo/ui/pages/collection/collection-items-panel'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { PageSelection } from '@echo/ui/types/page-selection'
import { isFalsy } from '@echo/utils/fp/is-falsy'
import type { Nullable } from '@echo/utils/types/nullable'
import { TabGroup, TabList, TabPanels } from '@headlessui/react'
import { all, isEmpty, isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  listings: ListingWithRole[]
  nfts: Nft[]
  offers: OfferWithRole[]
  slug: string
  swaps: Swap[]
  selection?: Nullable<PageSelection>
}

export const CollectionTabs: FunctionComponent<Props> = ({ slug, listings, nfts, offers, swaps, selection }) => {
  function tabGroupProps() {
    if (isNil(selection)) {
      return {}
    }
    switch (selection.type) {
      case 'listing':
        return { defaultIndex: 1 }
      case 'offer':
        return { defaultIndex: 2 }
      case 'swap':
        return { defaultIndex: 3 }
    }
  }
  const tabShown = [!isEmpty(nfts), !isEmpty(listings), !isEmpty(offers), !isEmpty(swaps)]
  if (all(isFalsy, tabShown)) {
    // TODO empty view
    return null
  }
  return (
    <TabGroup {...tabGroupProps()}>
      <TabList className={'tab-list'}>
        <ItemsTab show={tabShown[0]} />
        <ListingsTab show={tabShown[1]} />
        <OffersTab show={tabShown[2]} />
        <SwapsTab show={tabShown[3]} />
      </TabList>
      <TabPanels>
        <CollectionItemsPanel show={tabShown[0]} nfts={nfts} slug={slug} />
        <ListingsPanel
          show={tabShown[1]}
          listings={listings}
          selection={selection?.type === 'listing' ? selection.index : undefined}
        />
        <OffersPanel
          show={tabShown[2]}
          offers={offers}
          selection={selection?.type === 'offer' ? selection.index : undefined}
        />
        <SwapsPanel
          show={tabShown[3]}
          swaps={swaps}
          selection={selection?.type === 'swap' ? selection.index : undefined}
        />
      </TabPanels>
    </TabGroup>
  )
}
