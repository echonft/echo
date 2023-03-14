export type PartialRecord<K extends string | number | symbol, KV> = {
  [P in K]?: KV | undefined
}
