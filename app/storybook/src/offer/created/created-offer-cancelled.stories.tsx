// noinspection JSUnusedGlobalSymbols

import { CreatedOfferCancelled } from '@echo/ui/components/offer/created/created-offer-cancelled'
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
      options: ['One', 'Multiple'],
      control: { type: 'radio' }
    }
  }
}
export default metadata

export const Cancelled: StoryObj<ComponentType> = {
  render: ({ nfts }) => <CreatedOfferCancelled count={nfts === 'One' ? 1 : 2} />
}
