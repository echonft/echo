import { LongPressButton as Component } from '@echo/ui/components/base/long-press-button'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Long Press Button',
  component: Component,
  argTypes: {
    disabled: {
      defaultValue: false,
      control: 'boolean'
    },
    threshold: {
      defaultValue: 3000,
      options: [500, 1000, 2000, 3000, 5000],
      control: { type: 'select' }
    },
    onFinish: {
      control: false,
      action: 'finished'
    }
  },
  parameters: {
    controls: {
      exclude: ['id', 'onFinish']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const LongPressButton: Story = {
  args: {
    id: 'whatever',
    label: 'Cancel',
    message: 'Hold to cancel',
    threshold: 3000,
    disabled: false
  },
  render: (args) => (
    <div style={{ paddingTop: 128 }}>
      <Component {...args} />
    </div>
  )
}
