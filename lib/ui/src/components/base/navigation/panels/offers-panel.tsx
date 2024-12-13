'use client'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { OfferCards } from '@echo/ui/components/offer/card/offer-cards'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { TabPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { type FunctionComponent } from 'react'

interface Props {
  offers: OfferWithRole[]
  show?: boolean
}

export const OffersPanel: FunctionComponent<Props> = ({ offers, show }) => {
  const router = useRouter()

  if (show) {
    return (
      <TabPanel className={clsx('outline-none')}>
        <OfferCards
          offers={offers}
          onSelect={(slug) => {
            router.push(frontendRoutes.offer.details.getUrl({ slug }))
          }}
        />
      </TabPanel>
    )
  }
  return null
}
