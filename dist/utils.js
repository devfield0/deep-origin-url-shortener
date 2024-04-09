"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUrl = exports.generateSlug = void 0;
const uuid_1 = require("uuid");
const valid_url_1 = __importDefault(require("valid-url"));
const generateSlug = () => {
    return (0, uuid_1.v4)().substring(0, 6);
};
exports.generateSlug = generateSlug;
// Validate URL
const isValidUrl = (url) => {
    return valid_url_1.default.isUri(url) !== undefined ? true : false;
};
exports.isValidUrl = isValidUrl;
