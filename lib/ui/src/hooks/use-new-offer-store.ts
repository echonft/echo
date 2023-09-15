import { NewOffer } from '@echo/ui/types/model/new-offer'
import { OfferItem } from '@echo/ui/types/model/offer-item'
import { User } from '@echo/ui/types/model/user'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { always, head, ifElse, omit, path, pipe } from 'ramda'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface NewOfferState {
  offer: NewOffer
  setReceiverItems: (receiverItems: OfferItem[]) => void
  setSenderItems: (senderItems: OfferItem[]) => void
  clearOffer: () => void
  hasNewOfferPending: () => boolean
}

export const useNewOfferStore = create<NewOfferState>()(
  devtools(
    (set, get) => ({
      offer: {} as NewOffer,
      setReceiverItems: (receiverItems) =>
        set((state) => ({
          ...state,
          offer: {
            ...state.offer,
            receiverItems,
            receiver: ifElse(isNilOrEmpty, always(undefined), pipe(head, path<User>(['nft', 'owner'])))(receiverItems)
          } as NewOffer
        })),
      setSenderItems: (senderItems) =>
        set((state) => ({
          ...state,
          offer: {
            ...state.offer,
            senderItems
          }
        })),
      clearOffer: () => set(omit(['offer']), true),
      hasNewOfferPending: () => !isNilOrEmpty(get().offer)
    }),
    {
      name: 'new-offer-storage'
    }
  )
)
