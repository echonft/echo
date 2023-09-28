import { RecentSwaps as Component } from '@echo/ui/components/home/swap/recent-swaps'
import { getAllOffers } from '@mocks/model/offer'
import type { Meta, StoryObj } from '@storybook/react'
import { concat } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Home/Recent Swaps',
  component: Component,
  parameters: {
    controls: {
      exclude: ['offers']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>
const offers = getAllOffers()

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    offers: concat(offers, offers)
  }
}
