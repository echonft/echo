// noinspection JSUnusedGlobalSymbols

import { Error404 as Component } from '@echo/ui/components/base/error/error-404'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Error/Not Found',
  component: Component
}

export default metadata

export const NotFound: StoryObj<typeof Component> = {}
