// noinspection JSUnusedGlobalSymbols

import { eqFilter } from '@echo/model/helpers/filter/eq-filter'
import { nftMocks } from '@echo/model/mocks/nft-mock'
import { TraitFilterPanel as Component } from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel'
import type { TraitFilter } from '@echo/ui/types/trait-filter'
import { isInWith } from '@echo/utils/helpers/is-in-with'
import { type Meta, type StoryObj } from '@storybook/react'
import { append, reject } from 'ramda'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Filters/By Traits/Panel',
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
    const [selection, setSelection] = useState<TraitFilter[]>([])
    const toggleSelection = (filter: TraitFilter) => {
      onToggleSelection?.(filter)
      if (isInWith(selection, eqFilter, filter)) {
        setSelection(reject(eqFilter(filter)))
      } else {
        setSelection(append(filter))
      }
    }
    return <Component nfts={nftMocks} selection={selection} onToggleSelection={toggleSelection} />
  }
}
