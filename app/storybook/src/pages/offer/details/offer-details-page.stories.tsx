// noinspection JSUnusedGlobalSymbols

import { OFFER_ROLE_RECEIVER, OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import {
  OFFER_STATE_EXPIRED,
  OFFER_STATE_OPEN,
  OFFER_STATES,
  READ_ONLY_OFFER_STATES
} from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import type { OfferRole } from '@echo/model/types/offer-role'
import type { OfferState } from '@echo/model/types/offer-state'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { expiredDate } from '@echo/storybook/mocks/expired-date'
import { notExpiredDate } from '@echo/storybook/mocks/not-expired-date'
import { PaddedSectionLayout } from '@echo/ui/components/base/layout/padded-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { OfferDetails } from '@echo/ui/components/offer/details/offer-details'
import { OfferDetailsSkeleton } from '@echo/ui/components/offer/details/skeleton/offer-details-skeleton'
import { getOfferPageLayoutBackground } from '@echo/ui/helpers/offer/get-offer-page-layout-background'
import { isOfferRoleSender } from '@echo/ui/helpers/offer/is-offer-role-sender'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, includes, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

type Role = 'Sender' | 'Receiver' | 'None'
type ComponentType = FunctionComponent<{
  state: OfferState
  role: Role
}>
const metadata: Meta<ComponentType> = {
  title: 'Pages/Offer/Details'
}

export default metadata

export const Page: StoryObj<ComponentType> = {
  args: {
    state: OFFER_STATE_OPEN,
    role: 'Sender'
  },
  argTypes: {
    state: {
      defaultValue: OFFER_STATE_OPEN,
      options: OFFER_STATES,
      control: { type: 'select' }
    },
    role: {
      defaultValue: 'Sender',
      options: ['Sender', 'Receiver', 'None'],
      control: { type: 'radio' }
    }
  },
  render: ({ role, state }) => {
    function setExpirationAndReadOnly(offer: Offer): Offer {
      if (offer.state === OFFER_STATE_EXPIRED) {
        return pipe<[Offer], Offer, Offer>(assoc('expiresAt', expiredDate()), assoc('readOnly', true))(offer)
      }
      if (includes(offer.state, READ_ONLY_OFFER_STATES)) {
        return pipe<[Offer], Offer, Offer>(assoc('expiresAt', notExpiredDate()), assoc('readOnly', true))(offer)
      }
      return pipe<[Offer], Offer, Offer>(assoc('expiresAt', notExpiredDate()), assoc('readOnly', false))(offer)
    }
    function setRole(offer: Offer): OfferWithRole {
      if (role === 'Sender') {
        return assoc<OfferRole, Offer, 'role'>('role', OFFER_ROLE_SENDER, offer)
      }
      return assoc<OfferRole, Offer, 'role'>('role', OFFER_ROLE_RECEIVER, offer)
    }
    const renderedOffer = pipe<[string], Offer, Offer, Offer, OfferWithRole>(
      getOfferMockById,
      assoc('state', state),
      setExpirationAndReadOnly,
      setRole
    )('LyCfl6Eg7JKuD7XJ6IPi')
    const user = getAuthUserMockByUsername(isOfferRoleSender(renderedOffer) ? 'crewnft_' : 'johnnycagewins')
    return (
      <PageLayout user={user} background={getOfferPageLayoutBackground(renderedOffer)}>
        <PaddedSectionLayout>
          <OfferDetails offer={renderedOffer} />
        </PaddedSectionLayout>
      </PageLayout>
    )
  }
}

export const Loading: StoryObj<ComponentType> = {
  render: () => (
    <PageLayout>
      <PaddedSectionLayout>
        <OfferDetailsSkeleton />
      </PaddedSectionLayout>
    </PageLayout>
  )
}
