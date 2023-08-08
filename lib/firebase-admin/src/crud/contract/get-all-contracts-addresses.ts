import { getAllContracts } from './get-all-contracts'
import { andThen, map, pipe, prop } from 'ramda'

export const getAllContractsAddresses = (): Promise<string[]> =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pipe(getAllContracts, andThen(map(prop('address'))))()
