// noinspection JSUnusedGlobalSymbols

import { userMockCrew } from '@echo/model/mocks/user-mock'
import { Header as Component } from '@echo/ui/components/base/header/header'
import { HeaderStyle } from '@echo/ui/constants/header-style'
import { type Meta, type StoryObj } from '@storybook/react'
import { values } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Base/Header',
  component: Component,
  args: {
    user: userMockCrew
  },
  argTypes: {
    style: {
      options: values(HeaderStyle),
      control: { type: 'select' }
    }
  },
  parameters: {
    controls: {
      exclude: ['user']
    }
  }
}

export default metadata

export const LoggedOut: StoryObj<typeof Component> = {}
