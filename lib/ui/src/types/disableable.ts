export interface Disableable {
  disabled?: true
}

export type DisableableType<T> = T & Disableable
