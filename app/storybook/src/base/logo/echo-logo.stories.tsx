// noinspection JSUnusedGlobalSymbols

import { Logo as Component } from '@echo/ui/components/base/logo'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Echo Logo',
  component: Component
}

export default metadata

export const EchoLogo: StoryObj<typeof Component> = {}
