import { Client, ClientEvents, PermissionFlagsBits, PermissionResolvable } from 'discord.js'

// Bit of a hack of a helper function to give async tasks that aren't tracked time to run. A better approach would be to listen to dispatched events
export async function delay(timeInMs?: number) {
  await new Promise((resolve) => setTimeout(resolve, timeInMs ?? 500))
}

export async function emitEvent<E extends keyof ClientEvents>(client: Client, event: E, ...args: ClientEvents[E]) {
  const status = client.emit(event, ...args)
  await delay()
  return status
}
// UNUSED FOR NOW
// export function overrideVariables<T extends {}>(obj: T, overrides: {}) {
// 	Object.assign(obj, overrides);
// }
//
// export function copyClass<T extends { client: Client }>(
// 	obj: T,
// 	client: Client,
// 	overrides: {} = {},
// ) {
// 	const created = Object.assign(
// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
// 		Object.create(Object.getPrototypeOf(obj)),
// 		obj,
// 	) as T;
// 	overrideVariables(created, { client, ...overrides });
// 	return created;
// }

export type PermissionVariantsTest = {
  permissionsThatShouldWork: PermissionResolvable[]
  operation: (permission: PermissionResolvable, isPermissionAllowed: boolean) => Promise<void> | void
}

export async function testAllPermissions({ permissionsThatShouldWork, operation }: PermissionVariantsTest) {
  // Possibly swap to Promise.All - going in parallel break things sometimes
  for await (const permission of Object.keys(PermissionFlagsBits)) {
    const permissionIsAllowed = permissionsThatShouldWork.includes(permission as PermissionResolvable)
    await operation(permission as PermissionResolvable, permissionIsAllowed)
  }
}
