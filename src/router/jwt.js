import jwt from 'jsonwebtoken';
const salt = 'barobaro';

const createToken = (payload) => {
    const token = jwt.sign(payload, salt, {expiresIn: '1h'});

    return token;
}

const refreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, salt);

        const payload = {
            userid : decoded.userid,
        };

        const newToken = createToken(payload);
        return newToken;
    }
    catch (error) {
        console.error("Error refreshing token", error);
        return null;
    }
}


export { createToken, refreshToken };