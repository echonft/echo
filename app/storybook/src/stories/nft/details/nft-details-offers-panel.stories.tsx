import { offers } from '@echo/model'
import { NftDetailsOffersPanel as Component, NftDetailsOffersPanelSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { assoc } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Nft/Details/Offers Panel',
  component: Component,
  parameters: {
    controls: {
      exclude: 'offers'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    offers: [
      assoc('expiresAt', dayjs().add(1, 'hour'), offers['LyCfl6Eg7JKuD7XJ6IPi']!),
      assoc('expiresAt', dayjs().add(6, 'hour'), offers['LyCfl6Eg7JKuD7XJ6IPi']!),
      assoc('expiresAt', dayjs().add(1, 'day'), offers['LyCfl6Eg7JKuD7XJ6IPi']!),
      assoc('expiresAt', dayjs().add(40, 'hour'), offers['LyCfl6Eg7JKuD7XJ6IPi']!)
    ]
  }
}

export const Empty: Story = {
  args: {
    offers: []
  }
}

export const Skeleton: Story = {
  render: () => <NftDetailsOffersPanelSkeleton />
}
