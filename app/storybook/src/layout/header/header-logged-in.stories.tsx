import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { HeaderLoggedIn as Component } from '@echo/ui/components/layout/header/header-logged-in'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Layout/Header',
  component: Component,
  parameters: {
    controls: {
      exclude: ['user']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const LoggedIn: Story = {
  args: {
    user: getAuthUserMockByUsername('johnnycagewins')
  }
}
