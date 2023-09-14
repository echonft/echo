import { TraitFilterPanelSkeleton as Component } from '@echo/ui/components/nft/filters/by-traits/skeleton/trait-filter-panel-skeleton'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Filters/Trait Filter Panel',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
