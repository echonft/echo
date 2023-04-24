import {
  ButtonColorScheme,
  buttonSizes,
  buttonWidths,
  EditIconSvg,
  SizeMD,
  TextIconButton as Component
} from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Buttons/Text Icon Button',
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
      exclude: ['disabled', 'getIconSize', 'icon']
    }
  }
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const Active: Story = {
  args: {
    size: SizeMD,
    colorScheme: ButtonColorScheme.PRIMARY,
    label: 'Edit'
  },
  render: ({ size, label, colorScheme }) => (
    <Component
      label={label}
      size={size}
      colorScheme={colorScheme}
      icon={<EditIconSvg />}
      getIconSize={(_size) => ({ width: 20, height: 20 })}
    />
  )
}

export const Disabled: Story = {
  args: {
    size: SizeMD,
    colorScheme: ButtonColorScheme.PRIMARY,
    label: 'Edit'
  },
  render: ({ size, label, colorScheme }) => (
    <Component
      label={label}
      size={size}
      colorScheme={colorScheme}
      disabled
      icon={<EditIconSvg />}
      getIconSize={(_size) => ({ width: 20, height: 20 })}
    />
  )
}
