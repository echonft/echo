import { ItemThumbnailSkeleton as Component } from '@echo/ui'
import { SizeMD } from '@echo/ui-model'
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
