// noinspection JSUnusedGlobalSymbols

import { HeaderLoggedOut as Component } from '@echo/ui/components/base/header/header-logged-out'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Header',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const LoggedOut: Story = {}
