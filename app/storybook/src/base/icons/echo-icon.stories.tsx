// noinspection JSUnusedGlobalSymbols

import { EchoIcon as Component } from '@echo/ui/components/base/icons/echo-icon'
import { COLOR_YELLOW } from '@echo/ui/constants/color'
import { ECHO_ICON_COLORS } from '@echo/ui/constants/echo-icon-color'
import { ICON_SIZES } from '@echo/ui/constants/icon-size'
import { SIZE_MD } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Icons/Echo',
  component: Component,
  args: {
    size: SIZE_MD,
    color: COLOR_YELLOW
  },
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

export const Echo: StoryObj<typeof Component> = {}
