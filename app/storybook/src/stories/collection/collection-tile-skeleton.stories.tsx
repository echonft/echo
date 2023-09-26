import { CollectionTileSkeleton as Component } from '@echo/ui/components/collection/tile/skeleton/collection-tile-skeleton'
import { SizeLG, SizeMD } from '@echo/ui/constants/size'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Tile',
  component: Component,
  argTypes: {
    size: {
      options: [SizeMD, SizeLG],
      control: { type: 'radio' }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {
  args: {
    size: SizeLG
  }
}
