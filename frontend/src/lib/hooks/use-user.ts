import { FirebaseDocument, FirebaseUser, mapUser } from '@echo/firebase'
import { User } from '@echo/model'
import { useCollection } from '@lib/services/firebase/hooks/use-collection'
import { successfulResult, SwrResult } from '@lib/services/swr/models/result'
import { limit, where } from 'firebase/firestore'
import { head } from 'ramda'
import { useAccount } from 'wagmi'

// FIXME Infinite loop here, it fetches forever
export function useUser(): SwrResult<User> {
  const { address } = useAccount()
  const result = useCollection<FirebaseUser, User>(address && FirebaseDocument.USERS, {
    constraints: [where('wallet', '==', address), limit(1)],
    mapper: (documentSnapshots) => documentSnapshots.map(mapUser)
  })
  return result?.data
    ? { ...result, data: head(result?.data || []) }
    : successfulResult({
        wallet: '0x28F25821EDe2f699476767495D7f8A9354068b4F',
        id: 'MmyJDOoMP2J5oD4PMG8Z',
        discordId: '460255274461167616'
      })
}
