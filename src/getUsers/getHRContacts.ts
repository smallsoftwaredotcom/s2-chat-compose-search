import { UserResponse } from 'stream-chat'
import { StreamClient, UserFilterArgs } from '../types'
import { filterSelf } from '../util/filterSelf'

export async function getHRContacts(
    streamClient: StreamClient,
    query?: string
): Promise<UserResponse[]> {
    if (!streamClient?.user?._location
        || !streamClient?.user?.teams?.length) {
        return []
    }
    try {
        const searchArgs: UserFilterArgs = {
            teams: { $contains: streamClient.user?.teams[0] },
            _hr: true,
        }
        if (query) searchArgs.name = { $autocomplete: query }

        const queryUsersResponse = await streamClient.queryUsers(searchArgs, {}, { limit: 100 })
        queryUsersResponse.users = filterSelf(queryUsersResponse.users, streamClient.user.id)

        return queryUsersResponse.users
    } catch (error: any) {
        throw new Error(error)
    }
}
