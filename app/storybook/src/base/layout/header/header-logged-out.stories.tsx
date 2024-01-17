import { HeaderLoggedOut as Component } from '@echo/ui/components/layout/header/header-logged-out'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Layout/Header',
  component: Component,
  parameters: {
    controls: {
      exclude: ['absolute']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const LoggedOut: Story = {
  args: {
    absolute: false
  }
}
