// noinspection JSUnusedGlobalSymbols

import type { Offer } from '@echo/model/types/offer'
import { getAllOfferMocks } from '@echo/model-mocks/offer/get-all-offer-mocks'
import { RecentSwaps as Component } from '@echo/ui/pages/home/swap/recent-swaps'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, concat, map, pipe } from 'ramda'

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
    offers: pipe<[], Offer[], Offer[], Offer[], OfferWithRole[]>(
      getAllOfferMocks,
      concat(getAllOfferMocks()),
      concat(getAllOfferMocks()),
      map<Offer, OfferWithRole>(assoc('role', undefined))
    )()
  }
}
