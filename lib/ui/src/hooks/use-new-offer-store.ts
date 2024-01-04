import { type OfferItem } from '@echo/model/types/offer-item'
import { type User } from '@echo/model/types/user'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { propIsNotEmpty } from '@echo/utils/fp/prop-is-not-empty'
import { always, assoc, either, head, ifElse, is, path, pipe } from 'ramda'
import { create } from 'zustand'

interface NewOfferState {
  modalOpen: boolean
  receiverItems: OfferItem[]
  senderItems: OfferItem[]
  getReceiver: () => User | undefined
  setReceiverItems: (args: ((items: OfferItem[]) => OfferItem[]) | OfferItem[]) => unknown
  setSenderItems: (args: ((items: OfferItem[]) => OfferItem[]) | OfferItem[]) => unknown
  clearOffer: VoidFunction
  openModal: VoidFunction
  closeModal: VoidFunction
  hasNewOfferPending: () => boolean
}

export const useNewOfferStore = create<NewOfferState>((set, get) => ({
  modalOpen: false,
  receiverItems: [],
  senderItems: [],
  getReceiver: () =>
    ifElse(
      isNilOrEmpty,
      always(undefined),
      pipe<[OfferItem[]], OfferItem, User>(head, nonNullableReturn(path(['nft', 'owner'])))
    )(get().receiverItems),
  setReceiverItems: (args) => {
    function setState(items: OfferItem[]) {
      set(assoc('receiverItems', items))
    }
    if (is(Function, args)) {
      setState(args(get().receiverItems))
    } else {
      setState(args)
    }
  },
  setSenderItems: (args) => {
    function setState(items: OfferItem[]) {
      set(assoc('senderItems', items))
    }
    if (is(Function, args)) {
      setState(args(get().senderItems))
    } else {
      setState(args)
    }
  },
  clearOffer: () => {
    set(pipe(assoc('receiverItems', []), assoc('senderItems', [])))
  },
  openModal: () => set(assoc('modalOpen', true)),
  closeModal: () => set(assoc('modalOpen', false)),
  hasNewOfferPending: () => pipe(get, either(propIsNotEmpty('receiverItems'), propIsNotEmpty('senderItems')))()
}))
