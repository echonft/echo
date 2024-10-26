// noinspection JSUnusedGlobalSymbols

import { CreatedOfferExecuted } from '@echo/ui/components/offer/created/created-offer-executed'
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

export const Executed: StoryObj<ComponentType> = {
  render: ({ nfts }) => <CreatedOfferExecuted count={nfts === 'One' ? 1 : 2} />
}
