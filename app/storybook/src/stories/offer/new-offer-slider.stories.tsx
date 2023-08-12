import { nfts, users } from '@echo/model'
import { NewOfferSliderManager as Component, newOfferState } from '@echo/ui'
import { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Slider/New Offer',
  component: Component
}

export default metadata

const mockReceiverItems = [nfts['QFjMRNChUAHNswkRADXh']!]
const mockSenderItems = [nfts['8hHFadIrrooORfTOLkBg']!]
const mockUser = users['oE6yUEQBPn7PZ89yMjKn']!

type Story = StoryObj<typeof Component>

const RenderedComponent = () => {
  const [, setNewOffer] = useRecoilState(newOfferState)
  useEffect(() => {
    setNewOffer({ receiverItems: mockReceiverItems, receiver: mockUser, senderItems: mockSenderItems })
  }, [])
  return <Component />
}
export const NewOfferSlider: Story = {
  render: () => (
    <RecoilRoot>
      <RenderedComponent />
    </RecoilRoot>
  )
}
