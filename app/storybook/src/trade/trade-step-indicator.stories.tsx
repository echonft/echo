// noinspection JSUnusedGlobalSymbols

import { CreateTradeStepIndicator as Component } from '@echo/ui/components/trade/create/create-trade-step-indicator'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Trade/Step Indicator',
  component: Component,
  args: {
    step: 1,
    totalSteps: 3,
    subtitles: ['First step', 'Second step', 'Third step']
  },
  argTypes: {
    step: { control: { type: 'number', min: 0, max: 3, step: 1 } },
    totalSteps: { control: { type: 'number', min: 1, max: 4, step: 1 } }
  }
}

export default metadata

export const StepIndicator: StoryObj<typeof Component> = {}
