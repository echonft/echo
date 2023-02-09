import { FirebaseDocumentName, FirestoreUser, mapUser } from '@echo/firebase'
import { User } from '@echo/model'
import { useCollection, UseCollectionOptions } from '@lib/services/firebase/hooks/use-collection'
import { successfulResult, SwrResult } from '@lib/services/swr/models/result'
import { limit, where } from 'firebase/firestore'
import { head } from 'ramda'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'

export function useUser(): SwrResult<User> {
  const { address } = useAccount()
  const queryOptions: UseCollectionOptions<FirestoreUser, User> = useMemo<UseCollectionOptions<FirestoreUser, User>>(
    () => ({
      constraints: [where('wallet', '==', address), limit(1)],
      mapper: (documentSnapshots) => documentSnapshots.map(mapUser)
    }),
    [address]
  )
  const result = useCollection<FirestoreUser, User>(address && FirebaseDocument.USERS, queryOptions)
  return result?.data
    ? { ...result, data: head(result?.data || []) }
    : successfulResult({
        wallet: '0x28F25821EDe2f699476767495D7f8A9354068b4F',
        id: 'MmyJDOoMP2J5oD4PMG8Z',
        discordId: '460255274461167616'
      })
}
