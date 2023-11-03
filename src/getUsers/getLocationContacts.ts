import { StreamClient, UserFilterArgs, UserFilterSort } from '../types'
import { filterSelf } from '../util/filterSelf'

export async function getLocationContacts(
    streamClient: StreamClient,
    query: string
): Promise<any[]> {
    let enable_location_search = false
    let locations_to_search: string[] = []
    let enable_crew_chat = false

    if (!streamClient?.user?._location
        || !streamClient?.user?.teams?.length) {
        return []
    }

    if (streamClient.user._manager_for_locations?.length > 0) {
        enable_crew_chat = true
    }

    // if user is _admin or _hr, enable both
    if (streamClient.user._admin || streamClient.user._hr) {
        enable_location_search = true
        enable_crew_chat = true
        locations_to_search = []
    }

    switch (streamClient.user._chat_options) {
        case 'Crew to Crew Disabled (allow Office)':
            if (streamClient.user._location === 'Office') {
                enable_crew_chat = true
            }
            break
        case 'Crew to Crew Enabled (within location)':
            enable_crew_chat = true
            break
        case 'Crew to Crew Disabled (allow Office and Managers)':
            const {
                _admin,
                _hr,
                _manager_for_locations,
                _location
            } = streamClient.user

            if (_location === 'Office') {
                enable_crew_chat = true
                enable_location_search = true
            }

            if (Array.isArray(_manager_for_locations) && _location !== 'Office') {
                enable_crew_chat = true
                enable_location_search = true
                locations_to_search = _manager_for_locations
            }
            break
        case 'Crew to Crew Enabled (across locations)':
            enable_location_search = true
            enable_crew_chat = true
            break
        default:
            break
    }
    if (enable_crew_chat) {
        try {
            const searchArgs: UserFilterArgs = {
                teams: { $contains: streamClient.user?.teams[0] },
            }

            if (query) {
                searchArgs.name = { $autocomplete: query }
                if (!enable_location_search) {
                    searchArgs._location = { $eq: streamClient.user?._location }
                } else if (locations_to_search.length > 0) {
                    searchArgs._location = { $in: locations_to_search }
                }
            } else searchArgs._location = { $eq: streamClient.user?._location }

            let sort: UserFilterSort
            if (query) sort = { name: 1 }
            else sort = [{ _location: 1 }, { name: 1 }]

            const queryUsersResponse = await streamClient.queryUsers(searchArgs, sort, { limit: 100 })
            queryUsersResponse.users = filterSelf(queryUsersResponse.users, streamClient.user.id)

            return queryUsersResponse.users
        } catch (error: any) {
            throw new Error(error)
        }
    } else {
        return []
    }
}
