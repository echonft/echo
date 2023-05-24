import { users } from '@echo/model'
import { Header as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Layout/Header/Header',
  component: Component,
  argTypes: {
    onSearchQueryChange: {
      control: false,
      action: 'changed'
    }
  }
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const Header: Story = {
  render: () => <Component user={users['oE6yUEQBPn7PZ89yMjKn']} />
}
