export interface TraitFilter {
  name: string
  count: number
}

export interface TraitFilterGroup {
  type: string
  traits: TraitFilter[]
}
