// noinspection JSUnusedGlobalSymbols

import { eqWithId } from '@echo/model/helpers/eq-with-id'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { TraitFilterPanel as Component } from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel'
import type { TraitFilter } from '@echo/ui/types/trait-filter'
import { isInWith } from '@echo/utils/fp/is-in-with'
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
      if (isInWith(selection, eqWithId, filter)) {
        setSelection(reject(eqWithId(filter)))
      } else {
        setSelection(append(filter))
      }
    }
    return <Component nfts={getAllNftMocks()} selection={selection} onToggleSelection={toggleSelection} />
  }
}
