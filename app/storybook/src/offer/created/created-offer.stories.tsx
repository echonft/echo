// noinspection JSUnusedGlobalSymbols

import { OfferRole } from '@echo/model/constants/offer-role'
import { OfferState } from '@echo/model/constants/offer-state'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { CreatedOfferSwitch } from '@echo/ui/components/offer/created/created-offer-switch'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, pipe, values } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

type ComponentType = FunctionComponent<{
  redeemed: boolean
  state: OfferState
}>

const metadata: Meta<ComponentType> = {
  title: 'Offer/Created',
  args: {
    redeemed: false,
    state: OfferState.Open
  },
  argTypes: {
    redeemed: {
      control: { type: 'boolean' }
    },
    state: {
      options: values(OfferState),
      control: { type: 'select' }
    }
  },
  decorators: [
    (Story) => (
      <PageLayout>
        <SectionLayout>
          <Story />
        </SectionLayout>
      </PageLayout>
    )
  ]
}

export default metadata

export const Switch: StoryObj<ComponentType> = {
  render: (props) => {
    const [redeemed, setRedeemed] = useState(props.redeemed)
    const [state, setState] = useState(props.state)
    useEffect(() => {
      setRedeemed(props.redeemed)
      setState(props.state)
    }, [props])
    return (
      <CreatedOfferSwitch
        offer={pipe(assoc('state', state), assoc('role', OfferRole.Sender))(offerMockToJohnnycage)}
        redeemed={redeemed}
      />
    )
  }
}
