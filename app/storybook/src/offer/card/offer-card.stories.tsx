// noinspection JSUnusedGlobalSymbols

import { OFFER_ROLE_RECEIVER } from '@echo/model/constants/offer-role'
import { OFFER_STATE_OPEN, OFFER_STATES } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import type { OfferState } from '@echo/model/types/offer-state'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OfferCard } from '@echo/ui/components/offer/card/offer-card'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { always, assoc, drop, modify, pipe, unless } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

type ComponentType = FunctionComponent<{
  state: OfferState
  stack: boolean
  scaleDisabled: boolean
}>

const DEFAULT_STATE = OFFER_STATE_OPEN
const DEFAULT_STACK = false
const DEFAULT_SCALE_DISABLED = false

const metadata: Meta<ComponentType> = {
  title: 'Offer/Card',
  argTypes: {
    state: {
      defaultValue: DEFAULT_STATE,
      options: OFFER_STATES,
      control: { type: 'radio' }
    },
    stack: {
      defaultValue: DEFAULT_STACK,
      control: 'boolean'
    },
    scaleDisabled: {
      defaultValue: DEFAULT_SCALE_DISABLED,
      control: 'boolean'
    }
  },
  args: {
    state: DEFAULT_STATE,
    stack: DEFAULT_STACK,
    scaleDisabled: DEFAULT_SCALE_DISABLED
  }
}
export default metadata
export const Default: StoryObj<ComponentType> = {
  render: ({ state, stack, scaleDisabled }) => {
    const offer: OfferWithRole = useMemo(
      () =>
        pipe<[Offer], OfferWithRole, OfferWithRole, OfferWithRole>(
          assoc('role', OFFER_ROLE_RECEIVER),
          assoc('state', state),
          unless<OfferWithRole, OfferWithRole>(
            always(stack),
            modify<'senderItems', OfferItem[], OfferItem[]>('senderItems', drop(1))
          )
        )(getOfferMockById('ASkFpKoHEHVH0gd69t1G')),
      [state, stack]
    )
    return <OfferCard offer={offer} options={{ scaleDisabled }} />
  }
}
