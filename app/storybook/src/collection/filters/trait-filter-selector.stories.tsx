// noinspection JSUnusedGlobalSymbols

import { TraitFilterSelector as Component } from '@echo/ui/components/nft/filters/by-traits/trait-filter-selector'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Filters/Trait Filter Selector',
  component: Component,
  argTypes: {
    onToggleSelection: {
      table: {
        disable: true
      }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    filter: { trait: 'Trait', value: 'Trait Value', count: 1754 }
  }
}

export const Overflow: Story = {
  args: {
    filter: { trait: 'Trait', value: 'This Trait value is waaaayyyyyyyyy too long', count: 1754 }
  }
}

export const Selected: Story = {
  args: {
    filter: {
      trait: 'Trait',
      value: 'Trait Name',
      count: 1754,
      selected: true
    }
  }
}
