// noinspection JSUnusedGlobalSymbols

import { OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import { OFFER_STATE_OPEN, OFFER_STATES } from '@echo/model/constants/offer-states'
import { getOfferMock } from '@echo/model/mocks/offer/get-offer-mock'
import type { OfferRole } from '@echo/model/types/offer/offer-role'
import type { OfferState } from '@echo/model/types/offer/offer-state'
import { PageLayoutBackgroundPicker } from '@echo/ui/components/base/layout/page-layout-background-picker'
import { CreatedOfferSwitch } from '@echo/ui/components/offer/created/created-offer-switch'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, pipe } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

type ComponentType = FunctionComponent<{
  redeemed: boolean
  state: OfferState
}>

const metadata: Meta<ComponentType> = {
  title: 'Offer/Created',
  args: {
    redeemed: false,
    state: OFFER_STATE_OPEN
  },
  argTypes: {
    redeemed: {
      control: { type: 'boolean' }
    },
    state: {
      options: OFFER_STATES,
      control: { type: 'select' }
    }
  }
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
      <PageLayoutBackgroundPicker layout={'padded'} excludeProviders={true}>
        <CreatedOfferSwitch
          offer={pipe(getOfferMock, assoc('state', state), assoc('role', OFFER_ROLE_SENDER as OfferRole))()}
          redeemed={redeemed}
        />
      </PageLayoutBackgroundPicker>
    )
  }
}
