// noinspection JSUnusedGlobalSymbols

import { CreatedOfferCreated } from '@echo/ui/components/offer/created/created-offer-created'
import type { Meta, StoryObj } from '@storybook/react'
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
  render: ({ nfts }) => <CreatedOfferCreated count={nfts === 'One' ? 1 : 2} slug={'slug'} />
}
