import type { User } from '@echo/model/types/user'
import { WalletButton } from '@echo/ui/components/wallet/wallet-button'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  user: Nullable<User>
}

export const HeaderWalletButton: FunctionComponent<Props> = ({ user }) => {
  if (isNil(user)) {
    return null
  }
  return <WalletButton />
}
