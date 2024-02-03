'use client'
import { type AuthUser } from '@echo/model/types/auth-user'
import { OfferDetails } from '@echo/ui/components/offer/details/offer-details'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  user: AuthUser
}

export const OfferDetailsPage: FunctionComponent<Props> = ({ offer }) => {
  return <OfferDetails offer={offer} />
}
