import { CollectionFilterPanelSkeleton as Component } from '@echo/ui/src/components/nft/filters/by-collection/skeleton/collection-filter-panel-skeleton'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Filters/Collection Filter Panel',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
