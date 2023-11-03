"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationContacts = void 0;
const filterSelf_1 = require("../util/filterSelf");
function getLocationContacts(streamClient, query) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function* () {
        let enable_location_search = false;
        let locations_to_search = [];
        let enable_crew_chat = false;
        if (!((_a = streamClient === null || streamClient === void 0 ? void 0 : streamClient.user) === null || _a === void 0 ? void 0 : _a._location)
            || !((_c = (_b = streamClient === null || streamClient === void 0 ? void 0 : streamClient.user) === null || _b === void 0 ? void 0 : _b.teams) === null || _c === void 0 ? void 0 : _c.length)) {
            return [];
        }
        if (((_d = streamClient.user._manager_for_locations) === null || _d === void 0 ? void 0 : _d.length) > 0) {
            enable_crew_chat = true;
        }
        // if user is _admin or _hr, enable both
        if (streamClient.user._admin || streamClient.user._hr) {
            enable_location_search = true;
            enable_crew_chat = true;
            locations_to_search = [];
        }
        switch (streamClient.user._chat_options) {
            case 'Crew to Crew Disabled (allow Office)':
                if (streamClient.user._location === 'Office') {
                    enable_crew_chat = true;
                }
                break;
            case 'Crew to Crew Enabled (within location)':
                enable_crew_chat = true;
                break;
            case 'Crew to Crew Disabled (allow Office and Managers)':
                const { _admin, _hr, _manager_for_locations, _location } = streamClient.user;
                if (_location === 'Office') {
                    enable_crew_chat = true;
                    enable_location_search = true;
                }
                if (Array.isArray(_manager_for_locations) && _location !== 'Office') {
                    enable_crew_chat = true;
                    enable_location_search = true;
                    locations_to_search = _manager_for_locations;
                }
                break;
            case 'Crew to Crew Enabled (across locations)':
                enable_location_search = true;
                enable_crew_chat = true;
                break;
            default:
                break;
        }
        if (enable_crew_chat) {
            try {
                const searchArgs = {
                    teams: { $contains: (_e = streamClient.user) === null || _e === void 0 ? void 0 : _e.teams[0] },
                };
                if (query) {
                    searchArgs.name = { $autocomplete: query };
                    if (!enable_location_search) {
                        searchArgs._location = { $eq: (_f = streamClient.user) === null || _f === void 0 ? void 0 : _f._location };
                    }
                    else if (locations_to_search.length > 0) {
                        searchArgs._location = { $in: locations_to_search };
                    }
                }
                else
                    searchArgs._location = { $eq: (_g = streamClient.user) === null || _g === void 0 ? void 0 : _g._location };
                let sort;
                if (query)
                    sort = { name: 1 };
                else
                    sort = [{ _location: 1 }, { name: 1 }];
                const queryUsersResponse = yield streamClient.queryUsers(searchArgs, sort, { limit: 100 });
                queryUsersResponse.users = (0, filterSelf_1.filterSelf)(queryUsersResponse.users, streamClient.user.id);
                return queryUsersResponse.users;
            }
            catch (error) {
                throw new Error(error);
            }
        }
        else {
            return [];
        }
    });
}
exports.getLocationContacts = getLocationContacts;
