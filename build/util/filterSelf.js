"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterSelf = void 0;
function filterSelf(users, userId) {
    return users.filter((user) => user.id !== userId);
}
exports.filterSelf = filterSelf;
