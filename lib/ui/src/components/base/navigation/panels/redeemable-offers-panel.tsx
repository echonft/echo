'use client'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { OfferCards } from '@echo/ui/components/offer/card/offer-cards'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { TabPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { isNil, nth } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'
import useSWR from 'swr'

interface Props {
  offers: OfferWithRole[]
  selection?: Nullable<number>
  show?: boolean
}

export const RedeemableOffersPanel: FunctionComponent<Props> = ({ offers, selection, show }) => {
  const router = useRouter()
  const { getEchoOffer } = useDependencies()
  const [filteredOffers, setFilteredOffers] = useState<OfferWithRole[]>(offers)
  const [offer, setOffer] = useState<Nullable<OfferWithRole>>(isNil(selection) ? undefined : nth(selection, offers))

  // Fetch and validate offers sequentially
  const { data: validatedOffers } = useSWR(
    show ? SWRKeys.contract.getEchoOffers(offers.map((offer) => offer.idContract)) : null,
    async () => {
      const validOffers: OfferWithRole[] = []

      // Process each offer sequentially to maintain order and relationship
      for (const offer of offers) {
        const contractOffer = await getEchoOffer(offer.idContract)
        if (!isNil(contractOffer)) {
          validOffers.push(offer)
        }
      }

      return validOffers
    }
  )

  // Update filtered offers when validation completes
  useEffect(() => {
    if (!isNil(validatedOffers)) {
      setFilteredOffers(validatedOffers)

      // If current selected offer is not in validated offers, clear it
      if (!isNil(offer) && !validatedOffers.some((valid) => valid.idContract === offer.idContract)) {
        setOffer(undefined)
      }
    }
  }, [validatedOffers, offer])

  if (show) {
    return (
      <TabPanel className={clsx('outline-none')}>
        <OfferCards
          offers={filteredOffers}
          onSelect={(slug) => {
            router.push(frontendRoutes.offer.details.getUrl({ slug }))
          }}
        />
      </TabPanel>
    )
  }
  return null
}
