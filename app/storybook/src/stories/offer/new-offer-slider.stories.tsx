import { nfts, users } from '@echo/model'
import { NewOfferSliderManager as Component, newOfferState } from '@echo/ui'
import { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Slider/New Offer',
  component: Component
}

export default metadata

const mockReceiverItems = [nfts['QFjMRNChUAHNswkRADXh']!]
const mockSenderItems = [nfts['8hHFadIrrooORfTOLkBg']!]
const mockUser = users['oE6yUEQBPn7PZ89yMjKn']!

type Story = StoryObj<typeof Component>
export const NewOfferSlider: Story = {
  render: () => {
    const [, setNewOfferState] = useRecoilState(newOfferState)
    useEffect(() => {
      setNewOfferState({ receiverItems: mockReceiverItems, receiver: mockUser, senderItems: mockSenderItems })
    }, [])
    return <Component />
  }
}
