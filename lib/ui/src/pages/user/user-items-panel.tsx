'use client'

import type { OwnedNft } from '@echo/model/types/owned-nft'
import { pathProvider } from '@echo/routing/path/path-provider'
import { NftsWithFilters } from '@echo/ui/components/nft/filters/nfts-with-filters'
import { SelectableNftsWithFilters } from '@echo/ui/components/nft/filters/selectable-nfts-with-filters'
import { NftAction } from '@echo/ui/constants/nft-actions'
import { TabPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
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
          <NftsWithFilters nfts={nfts} sortBy={'collection'} cardOptions={{ owner: { hide: true } }} />
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
            router.push(pathProvider.offer.new.get({ items: selection }))
          }}
        />
      </TabPanel>
    )
  }
  return null
}
