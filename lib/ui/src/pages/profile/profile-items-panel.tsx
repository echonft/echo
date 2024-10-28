'use client'

import type { OwnedNft } from '@echo/model/types/owned-nft'
import { pathProvider } from '@echo/routing/constants/path-provider'
import { SelectableNftsWithFilters } from '@echo/ui/components/nft/filters/selectable-nfts-with-filters'
import { NftAction } from '@echo/ui/constants/nft-actions'
import { TabPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: OwnedNft[]
  show?: boolean
}

export const ProfileItemsPanel: FunctionComponent<Props> = ({ nfts, show }) => {
  const router = useRouter()
  if (show) {
    return (
      <TabPanel className={clsx('outline-none')}>
        <SelectableNftsWithFilters
          nfts={nfts}
          sortBy={'collection'}
          action={NftAction.Listing}
          onSelectionAction={(selection) => {
            router.push(pathProvider.listing.new.withQuery({ items: selection }).get())
          }}
        />
      </TabPanel>
    )
  }
  return null
}
