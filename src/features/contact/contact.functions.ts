import { createServerFn } from '@tanstack/react-start'
import { handleContact } from './contact.server'

/**
 * The only code that runs on request (reference.md §6). The browser imports this file;
 * Start swaps the handler for an RPC stub, so contact.server.ts and its secrets stay on
 * the server. Input is validated inside handleContact, which returns a typed result
 * instead of throwing.
 */
export const sendContact = createServerFn({ method: 'POST' })
  .validator((data: unknown) => data)
  .handler(({ data }) => handleContact(data))
