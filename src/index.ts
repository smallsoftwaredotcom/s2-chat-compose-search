import { StreamClient } from './types'; // Adjust the path as necessary
import {
    getHRContacts,
    getLocationContacts,
    getManagerContacts
} from './getUsers';

class StreamUserSearch {
    private streamClient: StreamClient;

    constructor(streamClient: StreamClient) {
        if (!streamClient) {
            throw new Error('streamClient must be provided');
        }
        this.streamClient = streamClient;
    }

    async getHRContacts(query: string): Promise<any[]> {
        return getHRContacts(this.streamClient, query);
    }

    async getLocationContacts(query: string): Promise<any[]> {
        return getLocationContacts(this.streamClient, query);
    }

    async getManagerContacts(query: string): Promise<any[]> {
        return getManagerContacts(this.streamClient, query);
    }
}

export { StreamUserSearch };
