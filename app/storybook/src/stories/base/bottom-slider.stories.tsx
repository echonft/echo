import { BottomSliderManager as Component, OfferBottomSliderTitle } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Bottom Slider',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const BottomSlider: Story = {
  render: () => <Component renderTitle={() => <OfferBottomSliderTitle itemsSelected={1} />} />
}
