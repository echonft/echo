import type { AuthUser } from '@echo/model/types/auth-user'
import type { Wallet } from '@echo/model/types/wallet'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { pathIsNil } from '@echo/utils/fp/path-is-nil'
import { pipeableModifyPath } from '@echo/utils/fp/pipeable-modify-path'
import { converge, F, ifElse, includes, map, modify, path, pipe, prop, toLower } from 'ramda'

interface UserHasWalletArgs {
  user: AuthUser
  wallet: Wallet
}
export function userHasWallet(args: UserHasWalletArgs): boolean {
  return ifElse(
    pathIsNil(['user', 'wallets']),
    F,
    pipe<[UserHasWalletArgs], UserHasWalletArgs, UserHasWalletArgs, boolean>(
      pipeableModifyPath(['wallet', 'address'], toLower),
      pipeableModifyPath(['user', 'wallets'], map(modify('address', toLower))),
      converge<boolean, [(args: UserHasWalletArgs) => Wallet, (args: UserHasWalletArgs) => Wallet[]]>(includes, [
        prop('wallet'),
        nonNullableReturn(path(['user', 'wallets']))
      ])
    )
  )(args)
}
