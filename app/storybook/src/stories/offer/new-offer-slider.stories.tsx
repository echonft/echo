import { getOfferById } from '../../mocks/model/offer'
import { NewOfferSliderManager as Component } from '@echo/ui/src/components/offer/new/new-offer-slider-manager'
import { newOfferDataState } from '@echo/ui/src/services/state'
import type { OfferItem } from '@echo/ui-model'
import { Meta, StoryObj } from '@storybook/react'
import { FunctionComponent, useEffect } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'

const metadata: Meta<typeof Component> = {
  title: 'Offer/New Offer Bottom Slider',
  component: Component
}

export default metadata

const offer = getOfferById('LyCfl6Eg7JKuD7XJ6IPi')

type Story = StoryObj<typeof Component>

const RenderedComponent: FunctionComponent<{
  receiverItems?: OfferItem[]
  senderItems?: OfferItem[]
}> = ({ receiverItems = [], senderItems = [] }) => {
  const [, setNewOffer] = useRecoilState(newOfferDataState)
  useEffect(() => {
    setNewOffer({ receiverItems, receiver: offer.receiver, senderItems })
  }, [])
  return <Component />
}
export const Default: Story = {
  render: () => (
    <RecoilRoot>
      <RenderedComponent receiverItems={offer.receiverItems} senderItems={offer.senderItems} />
    </RecoilRoot>
  )
}

export const EmptySenderItems: Story = {
  render: () => (
    <RecoilRoot>
      <RenderedComponent receiverItems={offer.receiverItems} />
    </RecoilRoot>
  )
}

export const EmptyReceiverItems: Story = {
  render: () => (
    <RecoilRoot>
      <RenderedComponent senderItems={offer.senderItems} />
    </RecoilRoot>
  )
}
