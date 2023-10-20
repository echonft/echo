import { BottomSlider as Component } from '@echo/ui/components/layout/bottom-slider/bottom-slider'
import { BottomSliderTitle } from '@echo/ui/components/layout/bottom-slider/bottom-slider-title'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Bottom Slider',
  component: Component,
  parameters: {
    controls: {
      exclude: ['renderTitle']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    renderTitle: () => <BottomSliderTitle title={'This is the title'} />,
    children: (
      <div>
        <span className={'text-white'}>This is the inside container</span>
      </div>
    )
  }
}

export const WithCount: Story = {
  args: {
    renderTitle: () => <BottomSliderTitle title={'This is the title'} count={10} />,
    children: (
      <div>
        <span className={'text-white'}>This is the inside container</span>
      </div>
    )
  }
}
