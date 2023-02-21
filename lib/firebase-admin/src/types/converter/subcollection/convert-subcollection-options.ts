import { OrderByDirection } from '@google-cloud/firestore'

export interface ConvertSubcollectionOptions {
  getDocs: boolean
  orderBy?: {
    fieldPath: string
    direction?: OrderByDirection
  }
  paging?: {
    limit: number
    offset?: number
  }
}
