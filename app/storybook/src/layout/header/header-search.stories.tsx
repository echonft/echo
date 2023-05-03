import { HeaderSearchInput as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Layout/Header/Search Input',
  component: Component,
  argTypes: {
    onChange: {
      control: false,
      action: 'changed'
    }
  }
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const SearchInput: Story = {}
