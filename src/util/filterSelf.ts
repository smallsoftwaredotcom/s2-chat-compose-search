import { UserFilterResponse } from "../types";

export function filterSelf(
    users: UserFilterResponse[],
    userId: string
) {
    return users.filter((user) => user.id !== userId)
}