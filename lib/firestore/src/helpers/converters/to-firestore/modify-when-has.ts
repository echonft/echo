import type { PartialWithFieldValue } from 'firebase-admin/firestore'
import { has, when } from 'ramda'

export function modifyWhenHas<T, K extends keyof T, U, V = U>(
  whenTrueFn: (a: PartialWithFieldValue<T> & Record<K, U>) => PartialWithFieldValue<T> & Record<K, V>
): (a: PartialWithFieldValue<T>) => PartialWithFieldValue<T> | (PartialWithFieldValue<T> & Record<K, V>) {
  return when<
    PartialWithFieldValue<T>,
    PartialWithFieldValue<T> & Record<K, U>,
    PartialWithFieldValue<T> & Record<K, V>
  >(has('address') as (obj: PartialWithFieldValue<T>) => obj is PartialWithFieldValue<T> & Record<K, U>, whenTrueFn)
}
