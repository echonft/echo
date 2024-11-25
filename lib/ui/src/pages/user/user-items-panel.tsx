'use client'

import type { OwnedNft } from '@echo/model/types/nft'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { NftsWithFilters } from '@echo/ui/components/nft/filters/nfts-with-filters'
import { SelectableNftsWithFilters } from '@echo/ui/components/nft/filters/selectable-nfts-with-filters'
import { NftAction } from '@echo/ui/constants/nft-actions'
import { TabPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import type { NonEmptyArray } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  isAuthUser: boolean
  nfts: OwnedNft[]
  show?: boolean
}

export const UserItemsPanel: FunctionComponent<Props> = ({ isAuthUser, nfts, show }) => {
  const router = useRouter()

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
        <SelectableNftsWithFilters
          nfts={nfts}
          action={NftAction.Offer}
          sortBy={'collection'}
          onSelectionAction={(selection) => {
            router.push(frontendRoutes.offer.create.withQuery({ items: selection as NonEmptyArray<OwnedNft> }).get())
          }}
        />
      </TabPanel>
    )
  }
  return null
}
