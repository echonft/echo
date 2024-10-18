// noinspection JSUnusedGlobalSymbols

import { CollectionTileSkeleton as Component } from '@echo/ui/components/collection/tile/skeleton/collection-tile-skeleton'
import { Size } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Tile',
  component: Component,
  args: {
    size: Size.LG
  },
  argTypes: {
    size: {
      options: [Size.MD, Size.LG],
      control: { type: 'radio' }
    }
  }
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {}
