// noinspection JSUnusedGlobalSymbols

import { eqFilter } from '@echo/model/helpers/filter/eq-filter'
import { nftMocks } from '@echo/model/mocks/nft-mock'
import { CollectionFilterPanel as Component } from '@echo/ui/components/nft/filters/by-collection/collection-filter-panel'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import { type Meta, type StoryObj } from '@storybook/react'
import { isNil } from 'ramda'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Filters/By Collection/Panel',
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
      exclude: ['nfts', 'selection']
    }
  }
}

export default metadata

export const Panel: StoryObj<typeof Component> = {
  render: ({ onToggleSelection }) => {
    const [selection, setSelection] = useState<CollectionFilter>()
    const toggleSelection = (filter: CollectionFilter) => {
      onToggleSelection?.(filter)
      if (isNil(selection) || !eqFilter(selection, filter)) {
        setSelection(filter)
      } else {
        setSelection(undefined)
      }
    }
    return <Component nfts={nftMocks} selection={selection} onToggleSelection={toggleSelection} />
  }
}
