// noinspection JSUnusedGlobalSymbols

import { OfferRole } from '@echo/model/constants/offer-role'
import { swapMock } from '@echo/model/mocks/swap-mock'
import type { Swap } from '@echo/model/types/swap'
import { SwapDetails as Component, type SwapDetailsProps } from '@echo/ui/components/swap/details/swap-details'
import type { SwapWithRole } from '@echo/ui/types/swap-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { append, assoc, pipe, values } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props extends SwapDetailsProps {
  role: OfferRole | 'none'
}

type ComponentType = FunctionComponent<Props>

const metadata: Meta<ComponentType> = {
  title: 'Swap/Details',
  args: {
    role: 'none'
  },
  argTypes: {
    role: {
      options: pipe(values, append('none'))(OfferRole),
      control: { type: 'radio' }
    }
  }
}

export default metadata

export const Details: StoryObj<ComponentType> = {
  render: ({ role }) => {
    const [swap, setSwap] = useState<SwapWithRole>(assoc('role', undefined, swapMock))

    function setRole(swap: Swap | SwapWithRole): SwapWithRole {
      if (role === OfferRole.Sender) {
        return assoc('role', OfferRole.Sender, swap)
      }
      if (role === OfferRole.Receiver) {
        return assoc('role', OfferRole.Receiver, swap)
      }
      return assoc('role', undefined, swap)
    }

    useEffect(() => {
      setSwap(setRole)
    }, [role])

    return <Component swap={swap} />
  }
}
