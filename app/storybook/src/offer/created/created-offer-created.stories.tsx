// noinspection JSUnusedGlobalSymbols

import { offerMockFromJohnnycage } from '@echo/model/mocks/offer-mock'
import type { Item } from '@echo/model/types/item'
import type { Offer } from '@echo/model/types/offer'
import { CreatedOfferCreated } from '@echo/ui/components/offer/created/created-offer-created'
import type { Meta, StoryObj } from '@storybook/react'
import { always, equals, modify, type NonEmptyArray, take, when } from 'ramda'
import type { FunctionComponent } from 'react'

type ComponentType = FunctionComponent<{
  nfts: 'One' | 'Multiple'
}>

const metadata: Meta<ComponentType> = {
  title: 'Offer/Created',
  args: {
    nfts: 'One'
  },
  argTypes: {
    nfts: {
      defaultValue: 'One',
      options: ['One', 'Multiple'],
      control: { type: 'radio' }
    }
  }
}

export default metadata

// FIXME
export const Created: StoryObj<ComponentType> = {
  render: ({ nfts }) => {
    const offer = when<Offer, Offer>(
      always(equals(nfts, 'One')),
      modify<'senderItems', NonEmptyArray<Item>, NonEmptyArray<Item>>('senderItems', take(1)),
      offerMockFromJohnnycage
    )
    return <CreatedOfferCreated offer={offer} />
  }
}
