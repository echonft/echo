import { CreatedOfferSuccessImg } from '@echo/ui/components/offer/created/created-offer-success-img'
import { OfferCreationLayout } from '@echo/ui/components/offer/created/layout/offer-creation-layout'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const OfferCreationSuccessLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <OfferCreationLayout>
    <CreatedOfferSuccessImg />
    {children}
  </OfferCreationLayout>
)
