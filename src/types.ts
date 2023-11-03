import { StreamChat, UserFilters, UserResponse, OwnUserResponse, UserSort } from 'stream-chat';

interface ExtendedUserProperties {
    _hr: boolean;
    _admin: boolean;
    _location: string;
    _job_title: string;
    _manager_for_locations: string;
    _chat_options: string;
}

type ExtendedUser = OwnUserResponse & ExtendedUserProperties;

export interface UserFilterArgs extends UserFilters { }

export type UserFilterSort = UserSort

export interface UserFilterResponse extends UserResponse { }

export interface StreamClient extends StreamChat {
    user: ExtendedUser;
}