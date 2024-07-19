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
import { UserItemsPanel } from '@echo/ui/pages/user/user-items-panel'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { PageSelection } from '@echo/ui/types/page-selection'
import type { TabOptions } from '@echo/ui/types/tab-options'
import { isFalsy } from '@echo/utils/fp/is-falsy'
import type { Nullable } from '@echo/utils/types/nullable'
import { TabGroup, TabList, TabPanels } from '@headlessui/react'
import { all, always, find, findIndex, ifElse, isEmpty, isNil, map, pipe, prop, propEq } from 'ramda'
import type { FunctionComponent } from 'react'

type TabName = 'items' | 'listings' | 'offers' | 'swaps'

interface Props {
  isAuthUser: boolean
  listings: ListingWithRole[]
  nfts: Nft[]
  offers: OfferWithRole[]
  swaps: Swap[]
  selection?: Nullable<PageSelection>
}

export const UserTabs: FunctionComponent<Props> = ({ isAuthUser, listings, nfts, offers, swaps, selection }) => {
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
      name: 'items',
      show: !isEmpty(nfts)
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
    switch (selection.type) {
      case 'listing':
        return { defaultIndex: findIndex(propEq('listings', 'name'), tabs) }
      case 'offer':
        return { defaultIndex: findIndex(propEq('offers', 'name'), tabs) }
      case 'swap':
        return { defaultIndex: findIndex(propEq('swaps', 'name'), tabs) }
    }
  }
  function showTab(name: TabName) {
    return pipe(find<TabOptions<TabName>>(propEq(name, 'name')), ifElse(isNil, always(false), prop('show')))(tabs)
  }
  if (all(isFalsy, map(prop('show'), tabs))) {
    // TODO empty view
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
        <ListingsPanel
          show={showTab('listings')}
          listings={listings}
          selection={selection?.type === 'listing' ? selection.index : undefined}
        />
        <OffersPanel
          show={showTab('offers')}
          offers={offers}
          selection={selection?.type === 'offer' ? selection.index : undefined}
        />
        <SwapsPanel
          show={showTab('swaps')}
          swaps={swaps}
          selection={selection?.type === 'swap' ? selection.index : undefined}
        />
      </TabPanels>
    </TabGroup>
  )
}
