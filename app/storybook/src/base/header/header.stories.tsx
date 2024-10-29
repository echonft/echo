// noinspection JSUnusedGlobalSymbols

import { Header as Component } from '@echo/ui/components/base/header/header'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Header',
  component: Component
}

export default metadata

export const LoggedOut: StoryObj<typeof Component> = {}
