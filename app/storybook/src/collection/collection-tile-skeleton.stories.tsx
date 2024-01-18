// noinspection JSUnusedGlobalSymbols

import { CollectionTileSkeleton as Component } from '@echo/ui/components/collection/tile/skeleton/collection-tile-skeleton'
import { SIZE_LG, SIZE_MD } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Tile',
  component: Component,
  argTypes: {
    size: {
      options: [SIZE_MD, SIZE_LG],
      control: { type: 'radio' }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {
  args: {
    size: SIZE_LG
  }
}
