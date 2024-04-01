// noinspection JSUnusedGlobalSymbols

import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { CollectionNfts as Component } from '@echo/ui/pages/collection/nfts/collection-nfts'
import type { Meta, StoryObj } from '@storybook/react'
import { filter, pathEq, pipe, prop } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Collection/Nfts',
  component: Component,
  args: {
    slug: pipe(getCollectionMockById, prop('slug'))('1aomCtnoesD7WVll6Yi1'),
    nfts: pipe(getAllNftMocks, filter(pathEq('1aomCtnoesD7WVll6Yi1', ['collection', 'id'])))()
  },
  parameters: {
    controls: {
      exclude: ['nfts']
    }
  }
}

export default metadata

export const Nfts: StoryObj<typeof Component> = {}
