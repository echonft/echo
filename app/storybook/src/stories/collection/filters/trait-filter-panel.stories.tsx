import { getAllNfts } from '../../../mocks/model/nft'
import { TraitFilterPanel as Component, TraitFilterPanelSkeleton } from '@echo/ui'
import { NftTraits } from '@echo/ui-model'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Filters/Trait Filter Panel',
  component: Component,
  argTypes: {
    onSelectionUpdate: {
      control: false,
      action: 'selection updated'
    }
  },
  parameters: {
    controls: {
      exclude: ['nfts', 'selection']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    nfts: getAllNfts(),
    selection: {} as NftTraits
  }
}

export const Skeleton: Story = {
  render: () => <TraitFilterPanelSkeleton />
}
