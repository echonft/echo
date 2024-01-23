import type { ReactNode } from 'react'

export type NextLayoutParams<P = unknown> = P & { children?: ReactNode | undefined }
