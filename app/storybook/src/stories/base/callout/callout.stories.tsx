import { Callout as Component } from '@echo/ui/src/components/layout/callout/callout'
import { CalloutSeverity } from '@echo/ui/src/constants/callout-severity'
import { CalloutVariant } from '@echo/ui/src/constants/callout-variant'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Callout',
  component: Component,
  argTypes: {
    severity: {
      options: Object.values(CalloutSeverity),
      control: { type: 'radio' }
    },
    variant: {
      options: Object.values(CalloutVariant),
      control: { type: 'radio' }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Callout: Story = {
  args: {
    severity: CalloutSeverity.INFO,
    variant: CalloutVariant.SOLID,
    children: 'Please connect your wallet to unlock the full experience'
  }
}
