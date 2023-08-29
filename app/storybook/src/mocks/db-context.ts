import { Db } from './db-provider'
import { createContext } from 'react'

export const dbContext = createContext<Db | null>(null)
