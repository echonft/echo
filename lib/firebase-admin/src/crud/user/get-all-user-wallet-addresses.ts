import { getAllUsers } from './get-all-users'
import { getUserWalletAddresses } from './get-user-wallet-addresses'
import { R } from '@mobily/ts-belt'
import { andThen, flatten, map, pipe } from 'ramda'

export const getAllUserWalletAddresses = pipe(getAllUsers, andThen(R.map(pipe(map(getUserWalletAddresses), flatten))))
