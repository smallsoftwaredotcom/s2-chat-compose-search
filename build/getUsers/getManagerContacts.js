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
exports.getManagerContacts = void 0;
const filterSelf_1 = require("../util/filterSelf");
function getManagerContacts(streamClient, query) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        if (!((_a = streamClient === null || streamClient === void 0 ? void 0 : streamClient.user) === null || _a === void 0 ? void 0 : _a._location)
            || !((_c = (_b = streamClient === null || streamClient === void 0 ? void 0 : streamClient.user) === null || _b === void 0 ? void 0 : _b.teams) === null || _c === void 0 ? void 0 : _c.length)) {
            return [];
        }
        try {
            const searchArgs = {
                teams: { $contains: (_d = streamClient.user) === null || _d === void 0 ? void 0 : _d.teams[0] },
                _manager_for_locations: { $contains: (_e = streamClient.user) === null || _e === void 0 ? void 0 : _e._location },
            };
            if (query)
                searchArgs.name = { $autocomplete: query };
            const queryUsersResponse = yield streamClient.queryUsers(searchArgs, {}, { limit: 100 });
            queryUsersResponse.users = (0, filterSelf_1.filterSelf)(queryUsersResponse.users, streamClient.user.id);
            return queryUsersResponse.users;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.getManagerContacts = getManagerContacts;
