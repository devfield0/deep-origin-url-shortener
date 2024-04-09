"use strict";
// database.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.ShortenedUrl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ShortenedUrlSchema = new mongoose_1.default.Schema({
    url: { type: String, required: true },
    short_url: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    visits: { type: Number, default: 0 },
});
exports.ShortenedUrl = mongoose_1.default.model('ShortenedUrl', ShortenedUrlSchema);
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield mongoose_1.default.connect((_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : "");
        console.log('Connected to database');
    }
    catch (error) {
        console.error('Database connection error:', error);
    }
});
exports.connectToDatabase = connectToDatabase;
