// noinspection JSUnusedGlobalSymbols

import { getAllCollectionMocks } from '@echo/model/mocks/collection/get-all-collection-mocks'
import { type Collection } from '@echo/model/types/collection/collection'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { BG_COLLECTIONS } from '@echo/ui/constants/background'
import { CollectionsPage as Component } from '@echo/ui/pages/collections/collections-page'
import { CollectionsPageSkeleton } from '@echo/ui/pages/collections/skeleton/collections-page-skeleton'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { type Meta, type StoryObj } from '@storybook/react'
import { addIndex, assoc, concat, map, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Collections',
  component: Component,
  decorators: [
    (Story) => (
      <PageLayout background={BG_COLLECTIONS} excludeProviders={true}>
        <SectionLayout>
          <Story />
        </SectionLayout>
      </PageLayout>
    )
  ],
  parameters: {
    controls: {
      exclude: ['collections']
    }
  }
}

export default metadata

export const Page: StoryObj<typeof Component> = {
  args: {
    collections: pipe<[], Collection[], Collection[], Collection[], Collection[], CollectionWithRank[]>(
      getAllCollectionMocks,
      concat(getAllCollectionMocks()),
      concat(getAllCollectionMocks()),
      concat(getAllCollectionMocks()),
      addIndex(map)((collection, index) => pipe(assoc('swapsCount', 50 - index), assoc('rank', index + 1))(collection))
    )()
  }
}

export const Loading: StoryObj<typeof Component> = {
  args: {},
  render: () => <CollectionsPageSkeleton />
}
