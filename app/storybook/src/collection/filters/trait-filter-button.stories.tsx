import { CollapsibleManager, FiltersPanel, TraitFilterButton as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Collection/Filters/Trait Filter Button',
  component: Component
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: () => (
    <FiltersPanel>
      <Component type={'Trait'} />
    </FiltersPanel>
  )
}

export const Overflow: Story = {
  render: () => (
    <FiltersPanel>
      <Component type={'This Trait is waaaayyyyyyyyy too long'} />
    </FiltersPanel>
  )
}

export const Collapsed: Story = {
  render: () => (
    <FiltersPanel>
      <Component type={'Trait'} collapsed />
    </FiltersPanel>
  )
}

export const Managed: Story = {
  render: () => (
    <FiltersPanel>
      <CollapsibleManager>
        <Component type={'Trait'} />
      </CollapsibleManager>
    </FiltersPanel>
  )
}
