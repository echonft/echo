'use client'
import type { OwnedNft } from '@echo/model/types/nft'
import { ListingsPanel } from '@echo/ui/components/base/navigation/panels/listings-panel'
import { OffersPanel } from '@echo/ui/components/base/navigation/panels/offers-panel'
import { SwapsPanel } from '@echo/ui/components/base/navigation/panels/swaps-panel'
import { ExploreTab } from '@echo/ui/components/base/navigation/tabs/explore-tab'
import { ItemsTab } from '@echo/ui/components/base/navigation/tabs/items-tab'
import { ListingsTab } from '@echo/ui/components/base/navigation/tabs/listings-tab'
import { OffersTab } from '@echo/ui/components/base/navigation/tabs/offers-tab'
import { SwapsTab } from '@echo/ui/components/base/navigation/tabs/swaps-tab'
import { ProfileItemsPanel } from '@echo/ui/pages/profile/profile-items-panel'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { SwapWithRole } from '@echo/ui/types/swap-with-role'
import type { TabOptions } from '@echo/ui/types/tab-options'
import { isFalsy } from '@echo/utils/helpers/is-falsy'
import { TabGroup, TabList, TabPanels } from '@headlessui/react'
import { all, always, find, findIndex, ifElse, isEmpty, isNil, map, pipe, prop, propEq } from 'ramda'
import type { FunctionComponent } from 'react'

type TabName = 'items' | 'listings' | 'offers' | 'swaps' | 'explore'

interface Props {
  listings: ListingWithRole[]
  nfts: OwnedNft[]
  offers: OfferWithRole[]
  pendingListings: ListingWithRole[]
  swaps: SwapWithRole[]
  selection?: number
}

export const ProfileTabs: FunctionComponent<Props> = ({
  listings,
  nfts,
  offers,
  pendingListings,
  swaps,
  selection
}) => {
  const tabs: TabOptions<TabName>[] = [
    {
      name: 'items',
      show: !isEmpty(nfts)
    },
    {
      name: 'listings',
      show: !isEmpty(listings)
    },
    {
      name: 'offers',
      show: !isEmpty(offers)
    },
    {
      name: 'swaps',
      show: !isEmpty(swaps)
    },
    {
      name: 'explore',
      show: !isEmpty(pendingListings)
    }
  ]

  function showTab(name: TabName) {
    return pipe(find<TabOptions<TabName>>(propEq(name, 'name')), ifElse(isNil, always(false), prop('show')))(tabs)
  }

  if (all(isFalsy, map(prop('show'), tabs))) {
    // TODO empty view https://linear.app/echobot/issue/DEV-343/pages-with-tabs-empty-views
    return null
  }

  function tabGroupProps() {
    if (isNil(selection)) {
      return {}
    }
    return { defaultIndex: findIndex(propEq('swaps', 'name'), tabs) }
  }

  return (
    <TabGroup {...tabGroupProps()}>
      <TabList className={'tab-list'}>
        <ItemsTab show={showTab('items')} />
        <ListingsTab show={showTab('listings')} />
        <OffersTab show={showTab('offers')} />
        <SwapsTab show={showTab('swaps')} />
        <ExploreTab show={showTab('explore')} />
      </TabList>
      <TabPanels>
        <ProfileItemsPanel show={showTab('items')} nfts={nfts} />
        <ListingsPanel show={showTab('listings')} listings={listings} />
        <OffersPanel show={showTab('offers')} offers={offers} />
        <SwapsPanel show={showTab('swaps')} swaps={swaps} selection={selection} />
        <ListingsPanel show={showTab('explore')} listings={pendingListings} />
      </TabPanels>
    </TabGroup>
  )
}
