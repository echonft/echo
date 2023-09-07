import { BottomSlider as Component, BottomSliderTitle } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Bottom Slider',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: () => (
    <Component renderTitle={() => <BottomSliderTitle title={'This is the title'} />}>
      <div>
        <span className={'text-white'}>This is the inside container</span>
      </div>
    </Component>
  )
}

export const WithCount: Story = {
  render: () => (
    <Component renderTitle={() => <BottomSliderTitle title={'This is the title'} count={10} />}>
      <div>
        <span className={'text-white'}>This is the inside container</span>
      </div>
    </Component>
  )
}
