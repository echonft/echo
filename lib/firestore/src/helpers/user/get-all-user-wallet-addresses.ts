import { getAllUsers } from '../../crud/user/get-all-users'
import { getUserWalletAddresses } from './get-user-wallet-addresses'
import { andThen, flatten, map, pipe } from 'ramda'

export function getAllUserWalletAddresses(chainId: number) {
  return pipe(getAllUsers, andThen(pipe(map(getUserWalletAddresses(chainId)), flatten)))()
}
