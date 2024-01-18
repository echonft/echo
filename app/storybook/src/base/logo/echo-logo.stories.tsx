// noinspection JSUnusedGlobalSymbols

import { Logo as Component } from '@echo/ui/components/base/logo/logo'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Logos/Echo',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Echo: Story = {}
