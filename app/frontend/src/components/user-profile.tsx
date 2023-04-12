import { WalletToolbar } from '@components/wallet-toolbar'
import { useUser } from '@lib/hooks/use-user'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export const UserProfile: FunctionComponent = () => {
  const user = useUser()
  if (isNil(user)) {
    return <>Loading user...</>
  }
  if (R.isError(user)) {
    return <>Error on user</>
    // TODO Add callback?
    // return <Redirect to={'/login'} />
  }
  return <WalletToolbar userId={R.getExn(user).id} currentWallets={R.getExn(user).wallets ?? []} />
}
