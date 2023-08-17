import {
  NewOfferConfirmationModal,
  newOfferDataState,
  NewOfferSliderManager as Component,
  newOfferState,
  Nft,
  nfts,
  users
} from '@echo/ui'
import { Meta, StoryObj } from '@storybook/react'
import { FunctionComponent, useCallback, useEffect } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'

const metadata: Meta<typeof Component> = {
  title: 'Offer/New Offer Flow',
  component: Component
}

export default metadata

const mockReceiverItems = [nfts['QFjMRNChUAHNswkRADXh']!]
const mockSenderItems = [nfts['8hHFadIrrooORfTOLkBg']!]
const mockUser = users['oE6yUEQBPn7PZ89yMjKn']!

type Story = StoryObj<typeof Component>

const RenderedComponent: FunctionComponent<{
  receiverItems: Nft[]
  senderItems: Nft[]
}> = ({ receiverItems = [], senderItems = [] }) => {
  const [, setNewOffer] = useRecoilState(newOfferDataState)
  const [, setModalState] = useRecoilState(newOfferState)

  const resetModal = useCallback(() => {
    setNewOffer({ receiverItems, receiver: mockUser, senderItems })
    setModalState('NONE')
  }, [setNewOffer, setModalState])

  useEffect(() => {
    resetModal()
  }, [])

  return (
    <div className={'bg-white'} style={{ height: '100vh' }}>
      <div className={'flex flex-row justify-center items-center h-full'}>
        <button onClick={() => resetModal()} className={'btn-gradient group rounded-lg w-[9.875rem] py-1.5'}>
          <span className={'prose-label-sm-semi btn-label-gradient'}>Reset Offer</span>
        </button>
      </div>
      <Component />
      <NewOfferConfirmationModal />
    </div>
  )
}
export const Default: Story = {
  render: () => (
    <RecoilRoot>
      <RenderedComponent receiverItems={mockReceiverItems} senderItems={mockSenderItems} />
    </RecoilRoot>
  )
}
