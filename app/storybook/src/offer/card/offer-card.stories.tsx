// noinspection JSUnusedGlobalSymbols

import { OfferRole } from '@echo/model/constants/offer-role'
import { OfferState } from '@echo/model/constants/offer-state'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockFromJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { Offer } from '@echo/model/types/offer/offer'
import { OfferCard } from '@echo/ui/components/offer/card/offer-card'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { always, assoc, drop, modify, type NonEmptyArray, pipe, unless, values } from 'ramda'
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
      defaultValue: OfferState.Open,
      options: values(OfferState),
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
          assoc<OfferRole, 'role'>('role', OfferRole.Receiver),
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
