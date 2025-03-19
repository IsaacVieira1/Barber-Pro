"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(request, response, next) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        response.status(401).end();
        return;
    }
    const [, token] = authToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        request.user_id = sub;
        next();
    }
    catch (err) {
        response.status(401).end();
    }
}
