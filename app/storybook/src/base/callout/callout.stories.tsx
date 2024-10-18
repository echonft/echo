// noinspection JSUnusedGlobalSymbols

import { Callout as Component, type CalloutProps } from '@echo/ui/components/base/callout/callout'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { CalloutVariant } from '@echo/ui/constants/callout-variant'
import { type Meta, type StoryObj } from '@storybook/react'
import { values } from 'ramda'
import type { FunctionComponent } from 'react'

type ComponentType = FunctionComponent<
  Omit<CalloutProps, 'children'> & {
    text: string
    clickable: boolean
  }
>
const metadata: Meta<ComponentType> = {
  title: 'Base/Callout',
  args: {
    clickable: false,
    severity: CalloutSeverity.Info,
    variant: CalloutVariant.Solid,
    text: 'Please connect your wallet to unlock the full experience'
  },
  argTypes: {
    clickable: {
      defaultValue: false,
      control: { type: 'boolean' }
    },
    severity: {
      defaultValue: CalloutSeverity.Info,
      options: values(CalloutSeverity),
      control: { type: 'radio' }
    },
    variant: {
      defaultValue: CalloutVariant.Solid,
      options: values(CalloutVariant),
      control: { type: 'radio' }
    },
    onClick: {
      table: {
        disable: true
      }
    }
  }
}

export default metadata

export const Callout: StoryObj<ComponentType> = {
  render: ({ severity, variant, text, clickable, onClick }) => (
    <Component severity={severity} variant={variant} onClick={clickable ? onClick : undefined}>
      {text}
    </Component>
  )
}
