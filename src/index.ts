import { StreamClient } from './types'; // Adjust the path as necessary
import {
    getHRContacts,
    getLocationContacts,
    getManagerContacts
} from './getUsers';
import { UserResponse } from 'stream-chat';

class StreamUserSearch {
    private streamClient: StreamClient;

    constructor(streamClient: StreamClient) {
        if (!streamClient) {
            throw new Error('streamClient must be provided');
        }
        this.streamClient = streamClient;
    }

    async getHRContacts(query?: string): Promise<UserResponse[]> {
        return getHRContacts(this.streamClient, query);
    }

    async getLocationContacts(query?: string): Promise<UserResponse[]> {
        return getLocationContacts(this.streamClient, query);
    }

    async getManagerContacts(query?: string): Promise<UserResponse[]> {
        return getManagerContacts(this.streamClient, query);
    }
}

export { StreamUserSearch };
