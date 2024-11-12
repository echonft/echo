import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { WhitelistedContractDocument } from '@echo/firestore/types/model/whitelisted-contract-document'
import { map } from 'ramda'

export async function getAllWhitelistedContracts(): Promise<WhitelistedContractDocument[]> {
  const snapshot = await firestoreApp().collection('whitelisted-contracts').get()
  return map((doc) => doc.data() as WhitelistedContractDocument, snapshot.docs)
}
