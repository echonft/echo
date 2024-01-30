// noinspection JSUnusedGlobalSymbols

import { CollectionFilterPanel as Component } from '@echo/ui/components/nft/filters/by-collection/collection-filter-panel'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Filters/Collection Filter Panel',
  component: Component,
  argTypes: {
    onToggleSelection: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['filters']
    }
  }
}

export default metadata

export const Default: StoryObj<typeof Component> = {
  args: {
    filters: [
      {
        name: 'pxMythics',
        id: 'whatever',
        count: 1
      },
      {
        name: 'This collection name is waaaayyyyyyyyy too long',
        id: 'whatever',
        count: 10
      },
      {
        name: 'Sun Flyers',
        id: 'whatever',
        count: 100,
        selected: true
      }
    ]
  }
}
