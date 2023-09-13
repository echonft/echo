import { ItemThumbnailSkeleton as Component } from '@echo/ui/components/item/thumbnail/skeleton/item-thumbnail-skeleton'
import { SizeMD } from '@echo/ui/constants/size'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Items/Thumbnail',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {
  args: {
    size: SizeMD
  }
}
