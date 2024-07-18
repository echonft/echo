// noinspection JSUnusedGlobalSymbols

import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { BACKGROUNDS, BG_DEFAULT } from '@echo/ui/constants/background'
import type { Background } from '@echo/ui/types/background'
import { type Meta, type StoryObj } from '@storybook/react'
import { type FunctionComponent } from 'react'

type ComponentType = FunctionComponent<{
  background: Background
}>
const metadata: Meta<ComponentType> = {
  title: 'Base/Layout/Page',
  args: {
    background: BG_DEFAULT
  },
  argTypes: {
    background: {
      options: BACKGROUNDS,
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
