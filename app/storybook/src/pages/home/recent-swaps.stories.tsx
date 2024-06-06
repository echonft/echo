// noinspection JSUnusedGlobalSymbols

import { getAllOfferMocks } from '@echo/model-mocks/offer/get-all-offer-mocks'
import type { Swap } from '@echo/model/types/swap'
import { RecentSwaps as Component } from '@echo/ui/pages/home/swap/recent-swaps'
import { type Meta, type StoryObj } from '@storybook/react'
import { concat, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home/Components/Recent Swaps',
  component: Component,
  parameters: {
    controls: {
      exclude: ['offers']
    }
  }
}

export default metadata

export const Default: StoryObj<typeof Component> = {
  args: {
    swaps: pipe(getAllOfferMocks, concat(getAllOfferMocks()), concat(getAllOfferMocks()))() as Swap[]
  }
}
