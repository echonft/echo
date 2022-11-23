import { mapUser } from '@echo/firebase/mappers/user'
import { FirebaseUser } from '@echo/firebase/model/user'
import { FirebaseDocument } from '@echo/firebase/paths/document-path'
import { User } from '@echo/model/user'
import { useCollection } from '@lib/services/firebase/hooks/use-collection'
import { SwrResult } from '@lib/services/swr/models/result'
import { where } from 'firebase/firestore'
import { head } from 'ramda'
import { useAccount } from 'wagmi'

export function useUser(): SwrResult<User> {
  const { address } = useAccount()
  const result = useCollection<FirebaseUser, User>(address && FirebaseDocument.USERS, {
    mapper: (snapshots) => snapshots.map(mapUser),
    constraints: [where('wallet', '==', address)]
  })
  return result && { ...result, data: result?.data && head(result.data) }
}
