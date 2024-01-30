// noinspection JSUnusedGlobalSymbols

import { OFFER_ROLE_RECEIVER, OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import {
  OFFER_STATE_EXPIRED,
  OFFER_STATE_OPEN,
  OFFER_STATES,
  READ_ONLY_OFFER_STATES
} from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import type { OfferState } from '@echo/model/types/offer-state'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { expiredDate } from '@echo/storybook/mocks/expired-date'
import { notExpiredDate } from '@echo/storybook/mocks/not-expired-date'
import { DetailsPaddedContainer } from '@echo/ui/components/base/layout/details-padded-container'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { OfferDetailsSkeleton } from '@echo/ui/components/offer/details/skeleton/offer-details-skeleton'
import { isOfferRoleSender } from '@echo/ui/helpers/offer/is-offer-role-sender'
import { ProfileOfferDetails as Component } from '@echo/ui/pages/profile/offer/profile-offer-details'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, includes, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

type Role = 'Sender' | 'Receiver'
type ComponentType = FunctionComponent<{
  state: OfferState
  role: Role
}>
const metadata: Meta<ComponentType> = {
  title: 'Pages/Profile/Offer/Details',
  decorators: [
    (Story) => (
      <NavigationPageLayout user={undefined}>
        <SectionLayout>
          <DetailsPaddedContainer>
            <Story />
          </DetailsPaddedContainer>
        </SectionLayout>
      </NavigationPageLayout>
    )
  ]
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
      control: { type: 'radio', options: ['Sender', 'Receiver'] }
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
        return assoc('role', OFFER_ROLE_SENDER, offer)
      }
      return assoc('role', OFFER_ROLE_RECEIVER, offer)
    }

    const renderedOffer = pipe<[string], Offer, Offer, Offer, OfferWithRole>(
      getOfferMockById,
      assoc('state', state),
      setExpirationAndReadOnly,
      setRole
    )('LyCfl6Eg7JKuD7XJ6IPi')
    return (
      <Component
        offer={renderedOffer}
        user={getAuthUserMockByUsername(isOfferRoleSender(renderedOffer) ? 'crewnft_' : 'johnnycagewins')}
      />
    )
  }
}

export const Loading: StoryObj<ComponentType> = {
  parameters: {
    controls: {
      exclude: ['state', 'isCreator']
    }
  },
  render: () => <OfferDetailsSkeleton />
}
