'use client'

import type { OwnedNft } from '@echo/model/types/nft'
import { ListingsPanel } from '@echo/ui/components/base/navigation/panels/listings-panel'
import { OffersPanel } from '@echo/ui/components/base/navigation/panels/offers-panel'
import { SwapsPanel } from '@echo/ui/components/base/navigation/panels/swaps-panel'
import { ItemsTab } from '@echo/ui/components/base/navigation/tabs/items-tab'
import { ListingsTab } from '@echo/ui/components/base/navigation/tabs/listings-tab'
import { OffersTab } from '@echo/ui/components/base/navigation/tabs/offers-tab'
import { SwapsTab } from '@echo/ui/components/base/navigation/tabs/swaps-tab'
import { UserItemsPanel } from '@echo/ui/pages/user/user-items-panel'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { SwapWithRole } from '@echo/ui/types/swap-with-role'
import type { TabOptions } from '@echo/ui/types/tab-options'
import { isFalsy } from '@echo/utils/helpers/is-falsy'
import { TabGroup, TabList, TabPanels } from '@headlessui/react'
import { all, always, filter, find, findIndex, ifElse, isEmpty, isNil, map, pipe, prop, propEq } from 'ramda'
import type { FunctionComponent } from 'react'

type TabName = 'items' | 'listings' | 'offers' | 'swaps'

interface Props {
  isAuthUser: boolean
  listings: ListingWithRole[]
  nfts: OwnedNft[]
  offers: OfferWithRole[]
  swaps: SwapWithRole[]
  selection?: number
}

export const UserNavigation: FunctionComponent<Props> = ({ isAuthUser, listings, nfts, offers, swaps, selection }) => {
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
    }
  ]

  function tabGroupProps() {
    if (isNil(selection)) {
      return {}
    }
    const defaultIndex = pipe(filter(propEq(true, 'show')), findIndex(propEq('offers', 'name')))(tabs)
    return { defaultIndex }
  }

  function showTab(name: TabName) {
    return pipe(find<TabOptions<TabName>>(propEq(name, 'name')), ifElse(isNil, always(false), prop('show')))(tabs)
  }

  if (all(isFalsy, map(prop('show'), tabs))) {
    // TODO empty view https://linear.app/echobot/issue/DEV-343/pages-with-tabs-empty-views
    return null
  }

  return (
    <TabGroup {...tabGroupProps()}>
      <TabList className={'tab-list'}>
        <ItemsTab show={showTab('items')} />
        <ListingsTab show={showTab('listings')} />
        <OffersTab show={showTab('offers')} />
        <SwapsTab show={showTab('swaps')} />
      </TabList>
      <TabPanels>
        <UserItemsPanel show={showTab('items')} isAuthUser={isAuthUser} nfts={nfts} />
        <ListingsPanel show={showTab('listings')} listings={listings} />
        <OffersPanel show={showTab('offers')} offers={offers} />
        <SwapsPanel show={showTab('swaps')} swaps={swaps} />
      </TabPanels>
    </TabGroup>
  )
}
