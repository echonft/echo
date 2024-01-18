import type { MouseEventHandler } from 'react'

export interface Banner {
  title: string
  subtitle?: string
  onClick?: MouseEventHandler
}
