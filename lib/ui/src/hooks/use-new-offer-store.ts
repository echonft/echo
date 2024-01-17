import { type OfferItem } from '@echo/model/types/offer-item'
import { type User } from '@echo/model/types/user'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { always, assoc, head, ifElse, is, path, pipe } from 'ramda'
import { create } from 'zustand'

interface NewOfferState {
  modalOpen: boolean
  receiverItems: OfferItem[]
  senderItems: OfferItem[]
  receiver: User | undefined
  setReceiverItems: (args: ((items: OfferItem[]) => OfferItem[]) | OfferItem[]) => unknown
  setSenderItems: (args: ((items: OfferItem[]) => OfferItem[]) | OfferItem[]) => unknown
  clearOffer: VoidFunction
  openModal: VoidFunction
  closeModal: VoidFunction
  hasNewOfferPending: boolean
}

export const useNewOfferStore = create<NewOfferState>((set, get) => ({
  modalOpen: false,
  receiverItems: [],
  senderItems: [],
  receiver: undefined,
  setReceiverItems: (args) => {
    function setState(items: OfferItem[]) {
      const hasNewOfferPending = isNonEmptyArray(items) || isNonEmptyArray(get().senderItems)
      const receiver = ifElse(
        isNilOrEmpty,
        always(undefined),
        pipe<[OfferItem[]], OfferItem, User>(head, nonNullableReturn(path(['nft', 'owner'])))
      )(items)
      set(
        pipe(
          assoc('receiverItems', items),
          assoc('hasNewOfferPending', hasNewOfferPending),
          assoc('receiver', receiver)
        )
      )
    }
    if (is(Function, args)) {
      setState(args(get().receiverItems))
    } else {
      setState(args)
    }
  },
  setSenderItems: (args) => {
    function setState(items: OfferItem[]) {
      const hasNewOfferPending = isNonEmptyArray(items) || isNonEmptyArray(get().receiverItems)
      set(pipe(assoc('senderItems', items), assoc('hasNewOfferPending', hasNewOfferPending)))
    }
    if (is(Function, args)) {
      setState(args(get().senderItems))
    } else {
      setState(args)
    }
  },
  clearOffer: () => {
    set(
      pipe(
        assoc('receiverItems', []),
        assoc('senderItems', []),
        assoc('hasNewOfferPending', false),
        assoc('receiver', undefined)
      )
    )
  },
  openModal: () => set(assoc('modalOpen', true)),
  closeModal: () => set(assoc('modalOpen', false)),
  hasNewOfferPending: false
}))
