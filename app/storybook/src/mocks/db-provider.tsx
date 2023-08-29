import { findOfferById } from '../utils/find-offer-by-id'
import { dbContext } from './db-context'
import { Offer } from '@echo/ui-model'
import { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction, useState } from 'react'

export interface Db {
  offer: {
    data: Offer | undefined
    setData: Dispatch<SetStateAction<Offer>>
  }
}

export const DbProvider: FunctionComponent<PropsWithChildren<Db>> = ({ children }) => {
  const [offer, setOffer] = useState<Offer>(findOfferById('LyCfl6Eg7JKuD7XJ6IPi'))
  return <dbContext.Provider value={{ offer: { data: offer, setData: setOffer } }}>{children}</dbContext.Provider>
}
