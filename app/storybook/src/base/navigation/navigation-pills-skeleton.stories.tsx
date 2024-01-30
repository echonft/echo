// noinspection JSUnusedGlobalSymbols

import { NavigationPillsSkeleton as Component } from '@echo/ui/components/base/navigation/skeleton/navigation-pills-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'
import type { ComponentType } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Navigation Pills',
  component: Component,
  parameters: {
    controls: {
      exclude: ['count']
    }
  }
}

export default metadata

export const Skeleton: StoryObj<ComponentType> = {
  args: {
    count: 4
  }
}
