import { NewOfferConfirmationModal as Component, newOfferDataState, newOfferState, Nft, nfts, users } from '@echo/ui'
import { Meta, StoryObj } from '@storybook/react'
import { FunctionComponent, useEffect } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'

const metadata: Meta<typeof Component> = {
  title: 'Offer/New Offer Confirmation Modal',
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
  const [newOffer, setNewOffer] = useRecoilState(newOfferDataState)
  const [, setModalState] = useRecoilState(newOfferState)
  useEffect(() => {
    setNewOffer({ receiverItems, receiver: mockUser, senderItems })
    setModalState('TO CONFIRM')
  }, [])
  return (
    newOffer && (
      <div className={'bg-white'} style={{ height: '100vh' }}>
        <Component />
        <div className={'flex flex-row justify-center items-center h-full'}>
          <button
            onClick={() => setModalState('TO CONFIRM')}
            className={'btn-gradient group rounded-lg w-[9.875rem] py-1.5'}
          >
            <span className={'prose-label-sm-semi btn-label-gradient'}>Open Modal</span>
          </button>
        </div>
      </div>
    )
  )
}
export const Default: Story = {
  render: () => (
    <RecoilRoot>
      <RenderedComponent receiverItems={mockReceiverItems} senderItems={mockSenderItems} />
    </RecoilRoot>
  )
}
