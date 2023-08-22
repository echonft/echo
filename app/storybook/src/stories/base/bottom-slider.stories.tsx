import { BottomSlider as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Bottom Slider',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const BottomSlider: Story = {
  render: () => (
    <Component renderTitle={() => <span className={'text-white'}>This is the title</span>}>
      <div>
        <span className={'text-white'}>This is the inside container</span>
      </div>
    </Component>
  )
}
