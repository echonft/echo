// noinspection JSUnusedGlobalSymbols

import { LongPressButton as Component } from '@echo/ui/components/base/long-press-button'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Long Press Button',
  component: Component,
  decorators: [
    (Story) => (
      <div style={{ paddingTop: 128 }}>
        <Story />
      </div>
    )
  ],
  argTypes: {
    disabled: {
      defaultValue: false,
      control: 'boolean',
      if: { arg: 'loading', truthy: false }
    },
    loading: {
      defaultValue: false,
      control: 'boolean',
      if: { arg: 'disabled', truthy: false }
    },
    threshold: {
      defaultValue: 3000,
      options: [500, 1000, 2000, 3000, 5000],
      control: { type: 'select' }
    },
    onFinish: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['id']
    }
  }
}

export default metadata

export const LongPressButton: StoryObj<typeof Component> = {
  args: {
    id: 'whatever',
    label: 'Cancel',
    message: 'Hold to cancel',
    threshold: 3000,
    disabled: false,
    loading: false
  }
}
