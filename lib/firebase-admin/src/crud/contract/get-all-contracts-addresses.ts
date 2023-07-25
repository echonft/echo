import { getAllContracts } from './get-all-contracts'
import { R } from '@mobily/ts-belt'
import { andThen, map, pipe, prop } from 'ramda'

export const getAllContractsAddresses = (): Promise<R.Result<string[], Error>> =>
  pipe(getAllContracts, andThen(R.map(map(prop<string>('address')))))()
