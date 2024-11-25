// noinspection JSUnusedGlobalSymbols

import { OfferState } from '@echo/model/constants/offer-state'
import { offerMockFromJohnnycage } from '@echo/model/mocks/offer-mock'
import type { Offer } from '@echo/model/types/offer'
import { OfferCard } from '@echo/ui/components/offer/card/offer-card'
import { type Meta, type StoryObj } from '@storybook/react'
import { always, assoc, modify, pipe, take, unless, values } from 'ramda'
import { type FunctionComponent } from 'react'

type ComponentType = FunctionComponent<{
  state: OfferState
  stack: boolean
}>

const metadata: Meta<ComponentType> = {
  title: 'Offer/Card',
  args: {
    state: OfferState.Open,
    stack: false
  },
  argTypes: {
    state: {
      options: values(OfferState),
      control: { type: 'select' }
    },
    stack: {
      control: 'boolean'
    }
  }
}
export default metadata
export const Default: StoryObj<ComponentType> = {
  render: ({ state, stack }) => {
    const offer = pipe<[Offer], Offer, Offer>(
      assoc('state', state),
      unless<Offer, Offer>(always(stack), modify('senderItems', take(1)))
    )(offerMockFromJohnnycage)
    return <OfferCard offer={offer} />
  }
}
