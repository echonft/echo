// noinspection JSUnusedGlobalSymbols

import { CollapsibleManager } from '@echo/ui/components/base/manager/collapsible-manager'
import { TraitFilterButton as Component } from '@echo/ui/components/nft/filters/by-traits/trait-filter-button'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Filters/By Traits/Button',
  component: Component,
  args: {
    collapsed: false
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
    }
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
  render: ({ trait, onToggleCollapsed }) => (
    <CollapsibleManager>
      <Component trait={trait} onToggleCollapsed={onToggleCollapsed} />
    </CollapsibleManager>
  )
}
