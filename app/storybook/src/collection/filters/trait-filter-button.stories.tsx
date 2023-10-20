import { CollapsibleManager } from '@echo/ui/components/base/manager/collapsible-manager'
import { FiltersPanel as Component } from '@echo/ui/components/layout/filters-panel'
import { TraitFilterButtonSkeleton } from '@echo/ui/components/nft/filters/by-traits/skeleton/trait-filter-button-skeleton'
import { TraitFilterButton } from '@echo/ui/components/nft/filters/by-traits/trait-filter-button'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Filters/Trait Filter Button',
  component: Component,
  parameters: {
    controls: {
      exclude: ['title', 'children']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    children: <TraitFilterButton trait={'Trait'} selectionCount={0} />
  }
}

export const Overflow: Story = {
  args: {
    children: <TraitFilterButton trait={'This Trait is waaaayyyyyyyyy too long'} selectionCount={0} />
  }
}

export const Collapsed: Story = {
  args: {
    children: <TraitFilterButton trait={'Trait'} collapsed selectionCount={1} />
  }
}

export const Managed: Story = {
  args: {
    children: (
      <CollapsibleManager>
        <TraitFilterButton trait={'Trait'} selectionCount={0} />
      </CollapsibleManager>
    )
  }
}

export const Skeleton: Story = {
  args: {
    children: <TraitFilterButtonSkeleton />
  }
}
