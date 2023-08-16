import { NewOfferSliderManager as Component, newOfferState, Nft, nfts, users } from '@echo/ui'
import { Meta, StoryObj } from '@storybook/react'
import { FunctionComponent, useEffect } from 'react'
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

const RenderedComponent: FunctionComponent<{
  receiverItems?: Nft[]
  senderItems?: Nft[]
}> = ({ receiverItems = [], senderItems = [] }) => {
  const [, setNewOffer] = useRecoilState(newOfferState)
  useEffect(() => {
    setNewOffer({ receiverItems, receiver: mockUser, senderItems })
  }, [])
  return <Component />
}
export const Default: Story = {
  render: () => (
    <RecoilRoot>
      <RenderedComponent receiverItems={mockReceiverItems} senderItems={mockSenderItems} />
    </RecoilRoot>
  )
}

export const EmptySenderItems: Story = {
  render: () => (
    <RecoilRoot>
      <RenderedComponent receiverItems={mockReceiverItems} />
    </RecoilRoot>
  )
}

export const EmptyReceiverItems: Story = {
  render: () => (
    <RecoilRoot>
      <RenderedComponent senderItems={mockSenderItems} />
    </RecoilRoot>
  )
}
