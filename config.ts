import dotenv from 'dotenv';
dotenv.config();

export default {
    hovi: {
        token: process.env.HOVI_TOKEN as string,
        baseUrl: 'https://api.hovi.nl/api/4',
        oasUrl: 'https://api.hovi.nl/api/4/openapi.json',
        rateLimit: 20, // requests per second
    },

    kiesmbo: {
        userId: process.env.KIESMBO_USER_ID as string,
        token: process.env.KIESMBO_TOKEN as string,
        baseUrl: 'https://gateway.s-bb.nl/kiesmbo/api/v2',
        /** 
         * NOTE: This sucks, but we first need to extract a sesison token from the GUI at
         * @link https://gateway-portal.s-bb.nl/api-details#api=kiesmbo-api
         */
        sessionToken: process.env.KIESMBO_SESSION_TOKEN as string,
        /** 
         * NOTE: calling this URL will return a 401 if session token is not present in headers
         */
        oasUrl: `https://gateway-portal.s-bb.nl/developer/users/${process.env.KIESMBO_USER_ID as string}/apis/kiesmbo-api?export=true&api-version=2022-04-01-preview`
    },

    google: {
        apiKey: process.env.GOOGLE_API_KEY as string,
    }


}