// noinspection JSUnusedGlobalSymbols

import { Callout as Component, type CalloutProps } from '@echo/ui/components/base/callout/callout'
import { CALLOUT_SEVERITIES, CALLOUT_SEVERITY_INFO } from '@echo/ui/constants/callout-severity'
import { CALLOUT_VARIANT_SOLID, CALLOUT_VARIANTS } from '@echo/ui/constants/callout-variant'
import { type Meta, type StoryObj } from '@storybook/react'
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
    severity: CALLOUT_SEVERITY_INFO,
    variant: CALLOUT_VARIANT_SOLID,
    text: 'Please connect your wallet to unlock the full experience'
  },
  argTypes: {
    clickable: {
      defaultValue: false,
      control: { type: 'boolean' }
    },
    severity: {
      defaultValue: CALLOUT_SEVERITY_INFO,
      options: CALLOUT_SEVERITIES,
      control: { type: 'radio' }
    },
    variant: {
      defaultValue: CALLOUT_VARIANT_SOLID,
      options: CALLOUT_VARIANTS,
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
