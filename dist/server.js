"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
// This allows Express to parse JSON from requests
app.use(express_1.default.json());
// Test route
app.get("/", (_req, res) => {
    res.json({ message: "Express server is running" });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
