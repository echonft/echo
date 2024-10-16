// noinspection JSUnusedGlobalSymbols

import { OFFER_ROLE_RECEIVER } from '@echo/model/constants/offer-role'
import { OFFER_STATE_OPEN, OFFER_STATES } from '@echo/model/constants/offer-states'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockFromJohnnycageId } from '@echo/model/mocks/offer/offer-mock'

import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { Offer } from '@echo/model/types/offer/offer'
import type { OfferRole } from '@echo/model/types/offer/offer-role'
import type { OfferState } from '@echo/model/types/offer/offer-state'
import { OfferCard } from '@echo/ui/components/offer/card/offer-card'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { always, assoc, drop, modify, type NonEmptyArray, pipe, unless } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

type ComponentType = FunctionComponent<{
  state: OfferState
  stack: boolean
  scaleDisabled: boolean
}>

const metadata: Meta<ComponentType> = {
  title: 'Offer/Card',
  args: {
    state: OFFER_STATE_OPEN,
    stack: false,
    scaleDisabled: false
  },
  argTypes: {
    state: {
      defaultValue: OFFER_STATE_OPEN,
      options: OFFER_STATES,
      control: { type: 'select' }
    },
    stack: {
      defaultValue: false,
      control: 'boolean'
    },
    scaleDisabled: {
      defaultValue: false,
      control: 'boolean'
    }
  }
}
export default metadata
export const Default: StoryObj<ComponentType> = {
  render: ({ state, stack, scaleDisabled }) => {
    const offer: OfferWithRole = useMemo(
      () =>
        pipe<[Offer], OfferWithRole, OfferWithRole, OfferWithRole>(
          assoc<OfferRole, 'role'>('role', OFFER_ROLE_RECEIVER),
          assoc('state', state),
          unless<OfferWithRole, OfferWithRole>(
            always(stack),
            modify('senderItems', drop(1) as unknown as (list: NonEmptyArray<OwnedNft>) => NonEmptyArray<OwnedNft>)
          )
        )(getOfferMockById(offerMockFromJohnnycageId())),
      [state, stack]
    )
    return <OfferCard offer={offer} options={{ scaleDisabled }} />
  }
}
