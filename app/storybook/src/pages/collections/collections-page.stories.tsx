// noinspection JSUnusedGlobalSymbols

import { collectionMocks } from '@echo/model/mocks/collection-mock'
import { type Collection } from '@echo/model/types/collection'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { HeaderStyle } from '@echo/ui/constants/header-style'
import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'
import { CollectionsPage as Component } from '@echo/ui/pages/collections/collections-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { type Meta, type StoryObj } from '@storybook/react'
import { addIndex, assoc, concat, map, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages',
  component: Component,
  decorators: [
    (Story) => (
      <PageLayout background={PageLayoutBackground.Collections}>
        <Header style={HeaderStyle.Default} />
        <MainSectionLayout>
          <Story />
        </MainSectionLayout>
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

export const Collections: StoryObj<typeof Component> = {
  args: {
    collections: pipe<[Collection[]], Collection[], Collection[], Collection[], CollectionWithRank[]>(
      concat(collectionMocks),
      concat(collectionMocks),
      concat(collectionMocks),
      addIndex(map)((collection, index) => pipe(assoc('swapsCount', 50 - index), assoc('rank', index + 1))(collection))
    )(collectionMocks)
  }
}
