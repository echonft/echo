// noinspection JSUnusedGlobalSymbols

import { OfferRole } from '@echo/model/constants/offer-role'
import { OfferState } from '@echo/model/constants/offer-state'
import { offerMockFromJohnnycage } from '@echo/model/mocks/offer-mock'
import type { Offer } from '@echo/model/types/offer'
import { OfferCard } from '@echo/ui/components/offer/card/offer-card'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { always, assoc, drop, modify, pipe, unless, values } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

type ComponentType = FunctionComponent<{
  state: OfferState
  stack: boolean
  scaleDisabled: boolean
}>

const metadata: Meta<ComponentType> = {
  title: 'Offer/Card',
  args: {
    state: OfferState.Open,
    stack: false,
    scaleDisabled: false
  },
  argTypes: {
    state: {
      options: values(OfferState),
      control: { type: 'select' }
    },
    stack: {
      control: 'boolean'
    },
    scaleDisabled: {
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
          assoc<OfferRole, 'role'>('role', OfferRole.Receiver),
          assoc('state', state),
          // FIXME
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          unless<OfferWithRole, OfferWithRole>(always(stack), modify('senderItems', drop(1)))
        )(offerMockFromJohnnycage),
      [state, stack]
    )
    return <OfferCard offer={offer} options={{ scaleDisabled }} />
  }
}
