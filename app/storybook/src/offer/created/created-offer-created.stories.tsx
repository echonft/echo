// noinspection JSUnusedGlobalSymbols

import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockFromJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { OwnedNft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { CreatedOfferCreated } from '@echo/ui/components/offer/created/created-offer-created'
import type { Meta, StoryObj } from '@storybook/react'
import { always, equals, modify, type NonEmptyArray, pipe, take, when } from 'ramda'
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

export const Created: StoryObj<ComponentType> = {
  render: ({ nfts }) => {
    const offer = pipe(
      offerMockFromJohnnycageId,
      getOfferMockById,
      when<Offer, Offer>(
        always(equals(nfts, 'One')),
        modify('senderItems', take(1) as unknown as (list: NonEmptyArray<OwnedNft>) => NonEmptyArray<OwnedNft>)
      )
    )()
    return <CreatedOfferCreated offer={offer} />
  }
}
