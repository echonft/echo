import { HeaderSearchInput as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Layout/Header/Search Input',
  component: Component,
  argTypes: {
    onChange: {
      control: false,
      action: 'changed'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const SearchInput: Story = {}
