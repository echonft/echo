// noinspection JSUnusedGlobalSymbols

import { PageLayoutSkeleton as Component } from '@echo/ui/components/base/layout/skeleton/page-layout-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Layout/Page',
  component: Component
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {}
