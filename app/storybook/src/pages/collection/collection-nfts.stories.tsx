// noinspection JSUnusedGlobalSymbols

import { COLLECTION_MOCK_SPIRAL_ID } from '@echo/model-mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { CollectionNfts as Component } from '@echo/ui/pages/collection/nfts/collection-nfts'
import type { Meta, StoryObj } from '@storybook/react'
import { filter, pathEq, pipe, prop } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Collection/Nfts',
  component: Component,
  args: {
    slug: pipe(getCollectionMockById, prop('slug'))(COLLECTION_MOCK_SPIRAL_ID),
    nfts: pipe(getAllNftMocks, filter(pathEq(COLLECTION_MOCK_SPIRAL_ID, ['collection', 'id'])))()
  },
  parameters: {
    controls: {
      exclude: ['nfts']
    }
  }
}

export default metadata

export const Nfts: StoryObj<typeof Component> = {}
