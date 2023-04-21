import { buttonSizes, ButtonVariant, buttonWidths, SizeMD, TextButton as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Buttons/Text Button',
  component: Component,
  argTypes: {
    size: {
      options: buttonSizes,
      control: { type: 'radio' }
    },
    variant: {
      options: Object.values(ButtonVariant),
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
    variant: ButtonVariant.PRIMARY,
    label: 'Text Button'
  }
}

export const Disabled: Story = {
  args: {
    size: SizeMD,
    variant: ButtonVariant.PRIMARY,
    label: 'Text Button',
    disabled: true
  }
}
