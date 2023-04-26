import { ButtonColorScheme, buttonSizes, buttonWidths, SizeMD, TextButton as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Base/Buttons/Text Button',
  component: Component,
  argTypes: {
    size: {
      options: buttonSizes,
      control: { type: 'radio' }
    },
    colorScheme: {
      options: Object.values(ButtonColorScheme),
      control: { type: 'radio' }
    },
    fixedWidth: {
      options: buttonWidths,
      control: { type: 'radio' }
    },
    onClick: {
      control: false,
      action: 'clicked'
    }
  },
  parameters: {
    controls: {
      exclude: 'disabled'
    }
  }
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const Active: Story = {
  args: {
    size: SizeMD,
    colorScheme: ButtonColorScheme.PRIMARY,
    label: 'Text Button'
  }
}

export const Disabled: Story = {
  args: {
    size: SizeMD,
    colorScheme: ButtonColorScheme.PRIMARY,
    label: 'Text Button',
    disabled: true
  }
}
