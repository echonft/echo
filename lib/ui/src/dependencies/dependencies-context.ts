import { Dependencies } from './dependencies-provider'
import { createContext } from 'react'

export const dependenciesContext = createContext<Dependencies | null>(null)
