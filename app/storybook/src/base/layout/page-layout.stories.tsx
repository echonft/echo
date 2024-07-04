// noinspection JSUnusedGlobalSymbols

import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { PAGE_LAYOUT_BACKGROUNDS, PAGE_LAYOUT_BG_DEFAULT } from '@echo/ui/constants/page-layout-background'
import type { PageLayoutBackground } from '@echo/ui/types/page-layout-background'
import { type Meta, type StoryObj } from '@storybook/react'
import { type FunctionComponent } from 'react'

type ComponentType = FunctionComponent<{
  background: PageLayoutBackground
}>
const metadata: Meta<ComponentType> = {
  title: 'Base/Layout/Page',
  args: {
    background: PAGE_LAYOUT_BG_DEFAULT
  },
  argTypes: {
    background: {
      options: PAGE_LAYOUT_BACKGROUNDS,
      control: { type: 'select' }
    }
  }
}

export default metadata

export const Default: StoryObj<ComponentType> = {
  args: {
    background: 'success'
  },

  render: ({ background }) => {
    return (
      <PageLayout background={background} excludeProviders={true}>
        <SectionLayout>
          <div style={{ width: '100%', height: '60rem' }} />
        </SectionLayout>
      </PageLayout>
    )
  }
}
