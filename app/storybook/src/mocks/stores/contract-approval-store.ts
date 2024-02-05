import { assoc } from 'ramda'
import { create } from 'zustand'

interface ContractApprovalStore {
  approved: boolean
  setApproved: (approved: boolean) => void
}
export const contractApprovalStore = create<ContractApprovalStore>((set) => ({
  approved: false,
  setApproved: (approved: boolean) => {
    set(assoc('approved', approved))
  }
}))
