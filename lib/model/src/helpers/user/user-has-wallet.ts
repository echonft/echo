import type { AuthUser } from '@echo/model/types/auth-user'
import type { Wallet } from '@echo/model/types/wallet'
import { pathIsNil } from '@echo/utils/fp/path-is-nil'
import type { HexString } from '@echo/utils/types/hex-string'
import { converge, F, ifElse, includes, map, modify, modifyPath, partial, path, pipe, prop, toLower } from 'ramda'

interface UserHasWalletArgs {
  user: AuthUser
  wallet: Wallet
}
export function userHasWallet(args: UserHasWalletArgs): boolean {
  return ifElse(
    pathIsNil(['user', 'wallets']),
    F,
    pipe<[UserHasWalletArgs], UserHasWalletArgs, UserHasWalletArgs, boolean>(
      partial(modifyPath<'wallet', 'address', UserHasWalletArgs, Lowercase<HexString>>, [
        ['wallet', 'address'],
        toLower
      ]),
      partial(modifyPath<'user', 'wallets', UserHasWalletArgs, Wallet[]>, [
        ['user', 'wallets'],
        map(modify('address', toLower))
      ]),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      converge(includes, [prop('wallet'), path(['user', 'wallets'])])
    )
  )(args)
}
