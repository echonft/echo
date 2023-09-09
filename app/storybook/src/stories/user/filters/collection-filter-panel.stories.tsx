import { getAllNfts } from '../../../mocks/model/nft'
import { CollectionFilterPanel as Component, CollectionFilterPanelSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Filters/Collection Filter Panel',
  component: Component,
  argTypes: {
    onSelectionUpdate: {
      control: false,
      action: 'selection updated'
    }
  },
  parameters: {
    controls: {
      exclude: ['filters', 'selection']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    nfts: getAllNfts(),
    selection: []
  }
}

export const Skeleton: Story = {
  render: () => <CollectionFilterPanelSkeleton />
}
