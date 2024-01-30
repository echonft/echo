// noinspection JSUnusedGlobalSymbols

import { CollapsibleManager } from '@echo/ui/components/base/manager/collapsible-manager'
import { TraitFilterButton as Component } from '@echo/ui/components/nft/filters/by-traits/trait-filter-button'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Filters/Trait Filter Button',
  component: Component,
  args: {
    collapsed: false,
    selectionCount: 0
  },
  argTypes: {
    onToggleCollapsed: {
      table: {
        disable: true
      }
    },
    collapsed: {
      defaultValue: false,
      control: { type: 'boolean' }
    },
    selectionCount: { defaultValue: 0, control: { type: 'number', min: 0, step: 1 } }
  },
  decorators: [
    (Story) => (
      <NftFiltersPanelLayout title={'Collections'}>
        <Story />
      </NftFiltersPanelLayout>
    )
  ]
}

export default metadata

export const Default: StoryObj<typeof Component> = {
  args: {
    trait: 'Trait'
  }
}

export const Overflow: StoryObj<typeof Component> = {
  args: {
    trait: 'This Trait is waaaayyyyyyyyy too long'
  }
}

export const Managed: StoryObj<typeof Component> = {
  args: {
    trait: 'Trait',
    collapsed: undefined
  },
  parameters: {
    controls: {
      exclude: ['collapsed']
    }
  },
  render: ({ trait, selectionCount, onToggleCollapsed }) => (
    <CollapsibleManager>
      <Component trait={trait} selectionCount={selectionCount} onToggleCollapsed={onToggleCollapsed} />
    </CollapsibleManager>
  )
}
