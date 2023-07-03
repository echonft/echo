import { is } from 'ramda'

export const mapIntToString = (value: string | number): string => (is(String, value) ? value : value.toString())
