import { StreamClient, UserFilterArgs } from '../types'
import { filterSelf } from '../util/filterSelf'

export async function getManagerContacts(
    streamClient: StreamClient,
    query?: string
): Promise<any[]> {
    if (!streamClient?.user?._location
        || !streamClient?.user?.teams?.length) {
        return []
    }
    try {
        const searchArgs: UserFilterArgs = {
            teams: { $contains: streamClient.user?.teams[0] },
            _manager_for_locations: { $contains: streamClient.user?._location },
        }
        if (query) searchArgs.name = { $autocomplete: query }

        const queryUsersResponse = await streamClient.queryUsers(searchArgs, {}, { limit: 100 })
        queryUsersResponse.users = filterSelf(queryUsersResponse.users, streamClient.user.id)

        return queryUsersResponse.users
    } catch (error: any) {
        throw new Error(error)
    }
}
