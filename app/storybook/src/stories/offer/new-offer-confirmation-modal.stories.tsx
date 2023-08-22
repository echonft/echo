import { getOfferById } from '../../mocks/model/offer'
import { NewOfferConfirmationModal as Component, newOfferDataState, newOfferState } from '@echo/ui'
import { OfferItem } from '@echo/ui-model'
import { Meta, StoryObj } from '@storybook/react'
import { FunctionComponent, useEffect } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'

const metadata: Meta<typeof Component> = {
  title: 'Offer/New Offer Confirmation Modal',
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
  const [, setModalState] = useRecoilState(newOfferState)

  const resetModal = useCallback(() => {
    setNewOffer({ receiverItems, receiver: offer.receiver, senderItems })
    setModalState('TO CONFIRM')
  }

  useEffect(() => {
    resetModal()
  }, [])
  return (
    <div className={'bg-white'} style={{ height: '100vh' }}>
      <div className={'flex flex-row justify-center items-center h-full'}>
        <button onClick={resetModal} className={'btn-gradient group rounded-lg w-[9.875rem] py-1.5'}>
          <span className={'prose-label-sm-semi btn-label-gradient'}>Open Modal</span>
        </button>
      </div>
      <Component />
    </div>
  )
}
export const Default: Story = {
  render: () => (
    <RecoilRoot>
      <RenderedComponent receiverItems={offer.receiverItems} senderItems={offer.senderItems} />
    </RecoilRoot>
  )
}

export const MultipleAssets: Story = {
  render: () => (
    <RecoilRoot>
      <RenderedComponent
        receiverItems={mockReceiverItems.concat(mockSenderItems)}
        senderItems={mockSenderItems.concat(mockReceiverItems)}
      />
    </RecoilRoot>
  )
}
