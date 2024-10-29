// noinspection JSUnusedGlobalSymbols

import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'
import { usePageLayoutStore } from '@echo/ui/hooks/use-page-layout-store'
import { HomePageSkeleton as Component } from '@echo/ui/pages/home/home-page-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'
import { useEffect } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home',
  component: Component,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    )
  ]
}

export default metadata

export const Loading: StoryObj<typeof Component> = {
  render: () => {
    const setBackground = usePageLayoutStore((state) => state.setBackground)

    useEffect(() => {
      setBackground(PageLayoutBackground.Home)
      return (): void => {
        setBackground(PageLayoutBackground.Default)
      }
    }, [setBackground])

    return <Component />
  }
}
