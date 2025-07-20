import { SessionsCollection } from "../models/session.js";

export const createSession = async ({
    userId,
    acessToken,
    refreshToken,
    acessTokenValidUntil,
    refreshTokenValidUntil,
}) => {
    return SessionsCollection.create({
        userId,
        acessToken,
        refreshToken,
        acessTokenValidUntil,
        refreshTokenValidUntil,
    });
};

export const findSessionByRefreshToken = async (refreshToken) => {
    return SessionsCollection.findOne({ refreshToken });
}

export const deleteSessionById = async (sessionId) => {
    return SessionsCollection.findByIdAndDelete(sessionId);
}