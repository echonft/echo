// noinspection JSUnusedGlobalSymbols

import { CreatedOfferSuccess } from '@echo/ui/components/offer/create/created/created-offer-success'
import type { Meta, StoryObj } from '@storybook/react'
import type { FunctionComponent } from 'react'

type ComponentType = FunctionComponent<{
  nfts: 'One' | 'Multiple'
}>

// FIXME slug won't be optional anymore
const metadata: Meta<ComponentType> = {
  title: 'Offer/Create',
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

export const Success: StoryObj<ComponentType> = {
  render: ({ nfts }) => <CreatedOfferSuccess count={nfts === 'One' ? 1 : 2} slug={'slug'} />
}
