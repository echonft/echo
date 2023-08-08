import { getAllUsers } from './get-all-users'
import { getUserWalletAddresses } from './get-user-wallet-addresses'
import { andThen, flatten, map, pipe } from 'ramda'

export const getAllUserWalletAddresses = pipe(getAllUsers, andThen(pipe(map(getUserWalletAddresses), flatten)))
