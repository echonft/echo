import { mapUser } from '@echo/firebase/mappers/user'
import { FirebaseUser } from '@echo/firebase/model/user'
import { FirebaseDocument } from '@echo/firebase/paths/document-path'
import { User } from '@echo/model/user'
import { useDocument } from '@lib/services/firebase/hooks/use-document'
import { useAccount } from 'wagmi'

export function useUser() {
  const { address } = useAccount()
  return useDocument<FirebaseUser, User>(FirebaseDocument.USERS, address && address, {
    mapper: mapUser
  })
}
