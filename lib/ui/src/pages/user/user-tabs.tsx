'use client'
import type { Nft } from '@echo/model/types/nft'
import type { Swap } from '@echo/model/types/swap'
import { UserItemsPanel } from '@echo/ui/components/user/navigation/panels/user-items-panel'
import { UserListingsPanel } from '@echo/ui/components/user/navigation/panels/user-listings-panel'
import { UserOffersPanel } from '@echo/ui/components/user/navigation/panels/user-offers-panel'
import { UserSwapsPanel } from '@echo/ui/components/user/navigation/panels/user-swaps-panel'
import { UserItemsTab } from '@echo/ui/components/user/navigation/tabs/user-items-tab'
import { UserListingsTab } from '@echo/ui/components/user/navigation/tabs/user-listings-tab'
import { UserOffersTab } from '@echo/ui/components/user/navigation/tabs/user-offers-tab'
import { UserSwapsTab } from '@echo/ui/components/user/navigation/tabs/user-swaps-tab'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { PageSelection } from '@echo/ui/types/page-selection'
import { isFalsy } from '@echo/utils/fp/is-falsy'
import type { Nullable } from '@echo/utils/types/nullable'
import { TabGroup, TabList, TabPanels } from '@headlessui/react'
import { all, isEmpty, isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  isAuthUser: boolean
  listings: ListingWithRole[]
  nfts: Nft[]
  offers: OfferWithRole[]
  swaps: Swap[]
  selection?: Nullable<PageSelection>
}

export const UserTabs: FunctionComponent<Props> = ({ isAuthUser, listings, nfts, offers, swaps, selection }) => {
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
        <UserItemsTab show={tabShown[0]} />
        <UserListingsTab show={tabShown[1]} />
        <UserOffersTab show={tabShown[2]} />
        <UserSwapsTab show={tabShown[3]} />
      </TabList>
      <TabPanels>
        <UserItemsPanel show={tabShown[0]} isAuthUser={isAuthUser} nfts={nfts} />
        <UserListingsPanel
          show={tabShown[1]}
          listings={listings}
          selection={selection?.type === 'listing' ? selection.index : undefined}
        />
        <UserOffersPanel
          show={tabShown[2]}
          offers={offers}
          selection={selection?.type === 'offer' ? selection.index : undefined}
        />
        <UserSwapsPanel
          show={tabShown[3]}
          swaps={swaps}
          selection={selection?.type === 'swap' ? selection.index : undefined}
        />
      </TabPanels>
    </TabGroup>
  )
}
