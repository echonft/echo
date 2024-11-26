import type { OwnedNft } from '@echo/model/types/nft'
import { NftsWithFilters } from '@echo/ui/components/nft/filters/nfts-with-filters'
import { TabPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: OwnedNft[]
  show?: boolean
}

export const ProfileItemsPanel: FunctionComponent<Props> = ({ nfts, show }) => {
  if (show) {
    return (
      <TabPanel className={clsx('outline-none')}>
        <NftsWithFilters nfts={nfts} sortBy={'collection'} options={{ owner: { hide: true } }} />
      </TabPanel>
    )
  }
  return null
}
