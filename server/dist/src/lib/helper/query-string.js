"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryString {
    static parse(object) {
        const keys = Object.keys(object);
        const keyValuePairs = keys.map((key) => {
            return encodeURIComponent(key) + "=" + encodeURIComponent(object[key]);
        });
        return keyValuePairs.join("&");
    }
}
exports.default = QueryString;
