import { getUserWalletAddresses } from '../../helpers/user/get-user-wallet-addresses'
import { getAllUsers } from './get-all-users'
import { andThen, flatten, map, pipe } from 'ramda'

export const getAllUserWalletAddresses = (chainId: number) =>
  pipe(getAllUsers, andThen(pipe(map(getUserWalletAddresses(chainId)), flatten)))()
