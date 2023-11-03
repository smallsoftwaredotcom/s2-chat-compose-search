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
exports.StreamUserSearch = void 0;
const getUsers_1 = require("./getUsers");
class StreamUserSearch {
    constructor(streamClient) {
        if (!streamClient) {
            throw new Error('streamClient must be provided');
        }
        this.streamClient = streamClient;
    }
    getHRContacts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getUsers_1.getHRContacts)(this.streamClient, query);
        });
    }
    getLocationContacts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getUsers_1.getLocationContacts)(this.streamClient, query);
        });
    }
    getManagerContacts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getUsers_1.getManagerContacts)(this.streamClient, query);
        });
    }
}
exports.StreamUserSearch = StreamUserSearch;
