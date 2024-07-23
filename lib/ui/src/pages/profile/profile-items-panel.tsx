'use client'
import { pathProvider } from '@echo/api/routing/path-provider'
import type { Nft } from '@echo/model/types/nft'
import { SelectableNftsWithFilters } from '@echo/ui/components/nft/filters/selectable-nfts-with-filters'
import { NFT_ACTION_LISTING } from '@echo/ui/constants/nft-actions'
import { TabPanel } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  show?: boolean
}

export const ProfileItemsPanel: FunctionComponent<Props> = ({ nfts, show }) => {
  const router = useRouter()
  if (show) {
    return (
      <TabPanel>
        <SelectableNftsWithFilters
          nfts={nfts}
          sortBy={'collection'}
          action={NFT_ACTION_LISTING}
          onSelectionAction={(selection) => {
            router.push(pathProvider.listing.new.get({ items: selection }))
          }}
        />
      </TabPanel>
    )
  }
  return null
}
