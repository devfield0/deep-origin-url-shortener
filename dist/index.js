"use strict";
// server.ts
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const utils_1 = require("./utils");
const database_1 = require("./database");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({ origin: (_a = process.env.ORIGION_URL) !== null && _a !== void 0 ? _a : "" }));
// Database connection
(0, database_1.connectToDatabase)();
// Shorten URL endpoint
app.post('/api/shorten', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, customSlug } = req.body;
    // Validate URL
    if (!(0, utils_1.isValidUrl)(url)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }
    // Generate slug
    const slug = customSlug || (0, utils_1.generateSlug)();
    const short_url = `${req.protocol}://${req.get('host')}/${slug}`;
    // Save to database
    const shortenedUrl = yield database_1.ShortenedUrl.create({ url, slug, short_url });
    res.json({ shortenedUrl });
}));
// Redirect endpoint
app.get('/:slug', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    // Find URL in database
    const shortenedUrl = yield database_1.ShortenedUrl.findOne({ slug });
    if (!shortenedUrl) {
        return res.status(404).json({ error: 'Not Found' });
    }
    // Increment visit count
    shortenedUrl.visits++;
    yield shortenedUrl.save();
    res.redirect(shortenedUrl.url);
}));
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
