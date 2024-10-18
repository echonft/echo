// noinspection JSUnusedGlobalSymbols

import { WebsiteIcon as Component } from '@echo/ui/components/base/icons/website-icon'
import { Size } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'
import { values } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Base/Icons/Website',
  component: Component,
  args: {
    size: Size.MD
  },
  argTypes: {
    size: {
      options: values(Size),
      control: { type: 'radio' }
    }
  }
}

export default metadata

export const Website: StoryObj<typeof Component> = {}
