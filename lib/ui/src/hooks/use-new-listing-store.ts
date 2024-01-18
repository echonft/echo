import type { ListingItem } from '@echo/model/types/listing-item'
import type { Target } from '@echo/ui/components/listing/new/new-listing-manager'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { assoc, is, isNotNil, pipe } from 'ramda'
import { create } from 'zustand'

interface NewListingState {
  modalOpen: boolean
  target: Target | undefined
  items: ListingItem[]
  setTarget: (args: ((target: Target | undefined) => Target) | Target | undefined) => unknown
  setItems: (args: ((items: ListingItem[]) => ListingItem[]) | ListingItem[]) => unknown
  clearListing: VoidFunction
  openModal: VoidFunction
  closeModal: VoidFunction
  hasNewListingPending: boolean
}

export const useNewListingStore = create<NewListingState>((set, get) => ({
  modalOpen: false,
  target: undefined,
  items: [],
  setTarget: (args) => {
    function setState(target: Target | undefined) {
      const hasNewListingPending = isNotNil(target) || isNonEmptyArray(get().items)
      set(pipe(assoc('target', target), assoc('hasNewListingPending', hasNewListingPending)))
    }
    if (is(Function, args)) {
      setState(args(get().target))
    } else {
      setState(args)
    }
  },
  setItems: (args) => {
    function setState(items: ListingItem[]) {
      const hasNewListingPending = isNonEmptyArray(items) || isNotNil(get().target)
      set(pipe(assoc('items', items), assoc('hasNewListingPending', hasNewListingPending)))
    }
    if (is(Function, args)) {
      setState(args(get().items))
    } else {
      setState(args)
    }
  },
  clearListing: () => {
    set(pipe(assoc('items', []), assoc('target', undefined), assoc('hasNewListingPending', false)))
  },
  openModal: () => set(assoc('modalOpen', true)),
  closeModal: () => set(assoc('modalOpen', false)),
  hasNewListingPending: false
}))
