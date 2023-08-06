import { CollapsibleManager, FiltersPanel, TraitFilterButton as Component, TraitFilterButtonSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Filters/Trait Filter Button',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: () => (
    <FiltersPanel>
      <Component trait={'Trait'} selectionCount={0} />
    </FiltersPanel>
  )
}

export const Overflow: Story = {
  render: () => (
    <FiltersPanel>
      <Component trait={'This Trait is waaaayyyyyyyyy too long'} selectionCount={0} />
    </FiltersPanel>
  )
}

export const Collapsed: Story = {
  render: () => (
    <FiltersPanel>
      <Component trait={'Trait'} collapsed selectionCount={1} />
    </FiltersPanel>
  )
}

export const Managed: Story = {
  render: () => (
    <FiltersPanel>
      <CollapsibleManager>
        <Component trait={'Trait'} selectionCount={0} />
      </CollapsibleManager>
    </FiltersPanel>
  )
}

export const Skeleton: Story = {
  render: () => (
    <FiltersPanel>
      <TraitFilterButtonSkeleton />
    </FiltersPanel>
  )
}
