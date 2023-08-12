import { NftDetails as Component, NftDetailsSkeleton } from '@echo/ui'
import { nfts, offers } from '@echo/ui-model'
import type { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { assoc } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/NFT Details',
  component: Component,
  argTypes: {
    onMakeOffer: {
      control: false,
      action: 'make offer clicked'
    }
  },
  parameters: {
    controls: {
      exclude: ['nft', 'offers']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    nft: nfts['QFjMRNChUAHNswkRADXh']!,
    offers: [
      assoc('expiresAt', dayjs().add(1, 'hour'), offers['LyCfl6Eg7JKuD7XJ6IPi']!),
      assoc('expiresAt', dayjs().add(6, 'hour'), offers['LyCfl6Eg7JKuD7XJ6IPi']!),
      assoc('expiresAt', dayjs().add(1, 'day'), offers['LyCfl6Eg7JKuD7XJ6IPi']!),
      assoc('expiresAt', dayjs().add(40, 'hour'), offers['LyCfl6Eg7JKuD7XJ6IPi']!)
    ]
  }
}

export const NoOffers: Story = {
  args: {
    nft: nfts['QFjMRNChUAHNswkRADXh']!,
    offers: []
  }
}

export const Skeleton: Story = {
  render: () => <NftDetailsSkeleton />
}
