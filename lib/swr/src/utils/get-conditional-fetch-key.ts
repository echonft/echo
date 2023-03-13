import { SwrKey } from '../types'

/**
 * Syntax sugar to return undefined when a given test is truthy so that SWR fetching does not happen
 * Please note that it will return the key (hence fetch) when the test is FALSY. It is handy since more often than not,
 * it's the condition that cancels/delay the fetching that we check
 * @param key
 * @param test
 */
export const getConditionalFetchKey = <T extends object>(key: SwrKey<T>, test: () => boolean): SwrKey<T> | undefined =>
  test() ? undefined : key
