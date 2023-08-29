import { dbContext } from '../db-context'
import { Db } from '../db-provider'
import { isNil } from 'ramda'
import { useContext } from 'react'

export const useDb = (): Db => {
  const contextValue = useContext(dbContext)
  if (isNil(contextValue)) {
    throw new Error('useDb must be used within DbProvider')
  }
  return contextValue
}
