import { Contract } from '@echo/model'

// TODO should we simply use the ID instead?
export type TargetRequest = Pick<Contract, 'address' & 'chainId'>
