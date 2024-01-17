import { Callout as Component } from '@echo/ui/components/layout/callout/callout'
import { CALLOUT_SEVERITIES, CALLOUT_SEVERITY_INFO } from '@echo/ui/constants/callout-severity'
import { CALLOUT_VARIANT_SOLID, CALLOUT_VARIANTS } from '@echo/ui/constants/callout-variant'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Callout',
  component: Component,
  argTypes: {
    severity: {
      options: CALLOUT_SEVERITIES,
      control: { type: 'radio' }
    },
    variant: {
      options: CALLOUT_VARIANTS,
      control: { type: 'radio' }
    }
  },
  parameters: {
    controls: {
      exclude: ['permanent']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Callout: Story = {
  args: {
    severity: CALLOUT_SEVERITY_INFO,
    variant: CALLOUT_VARIANT_SOLID,
    children: 'Please connect your wallet to unlock the full experience'
  }
}
