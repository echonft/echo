import { EchoIcon as Component } from '@echo/ui/components/base/icons/echo-icon'
import { COLOR_YELLOW } from '@echo/ui/constants/color'
import { ECHO_ICON_COLORS } from '@echo/ui/constants/echo-icon-color'
import { ICON_SIZES } from '@echo/ui/constants/icon-size'
import { SIZE_SM } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Icons/Echo Icon',
  component: Component,
  argTypes: {
    size: {
      options: ICON_SIZES,
      control: { type: 'radio' }
    },
    color: {
      options: ECHO_ICON_COLORS,
      control: { type: 'radio' }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const EchoIcon: Story = {
  args: {
    size: SIZE_SM,
    color: COLOR_YELLOW
  }
}
