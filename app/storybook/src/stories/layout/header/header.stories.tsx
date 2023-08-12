import { Header as Component } from '@echo/ui'
import { users } from '@echo/ui-model'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Layout/Header/Header',
  component: Component,
  argTypes: {
    onSearchQueryChange: {
      control: false,
      action: 'changed'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Header: Story = {
  render: () => <Component user={users['oE6yUEQBPn7PZ89yMjKn']} />
}
