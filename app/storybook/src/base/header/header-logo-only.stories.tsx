// noinspection JSUnusedGlobalSymbols

import { HeaderLogoOnly as Component } from '@echo/ui/components/layout/header/header-logo-only'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Header',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const LogoOnly: Story = {}
