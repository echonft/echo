import { FiltersPanel, SelectionManager, TraitFilterSelector as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Filters/Trait Filter Selector',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: () => (
    <FiltersPanel title={'Attributes'}>
      <Component
        value={{
          value: 'Trait Name',
          count: 1754
        }}
      />
    </FiltersPanel>
  )
}

export const Overflow: Story = {
  render: () => (
    <FiltersPanel title={'Attributes'}>
      <Component
        value={{
          value: 'This Trait Name is waaaayyyyyyyyy too long',
          count: 1754
        }}
      />
    </FiltersPanel>
  )
}

export const Selected: Story = {
  render: () => (
    <FiltersPanel title={'Attributes'}>
      <Component
        value={{
          value: 'Trait Name',
          count: 1754
        }}
        selected
      />
    </FiltersPanel>
  )
}

export const Managed: Story = {
  render: () => (
    <FiltersPanel title={'Attributes'}>
      <SelectionManager>
        <Component
          value={{
            value: 'Trait Name',
            count: 1754
          }}
        />
      </SelectionManager>
    </FiltersPanel>
  )
}
