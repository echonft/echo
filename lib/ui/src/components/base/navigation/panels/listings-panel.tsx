'use client'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { ListingCards } from '@echo/ui/components/listing/card/listing-cards'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { TabPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { type FunctionComponent } from 'react'

interface Props {
  listings: ListingWithRole[]
  show?: boolean
}

export const ListingsPanel: FunctionComponent<Props> = ({ listings, show }) => {
  const router = useRouter()
  if (show) {
    return (
      <TabPanel className={clsx('outline-none')}>
        <ListingCards
          listings={listings}
          onSelect={(slug) => {
            router.push(frontendRoutes.listing.details.getUrl({ slug }))
          }}
        />
      </TabPanel>
    )
  }
  return null
}
