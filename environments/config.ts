import { environment } from "./environment";

export  const URL={

    APP_URL: `${environment.apiUrl}`

};

export const CONFIG = {
    AUTH: {
        LOGIN: `${URL.APP_URL}/auth/login`,
        REGISTER: `${URL.APP_URL}/auth/register`,
        VERIFY: `${URL.APP_URL}/auth/after-verify-otp`,
        FORGET: `${URL.APP_URL}/auth/reset-password-verify-email`,
        NEW_PASSWORD: `${URL.APP_URL}/auth/new-password`,
        // UPDATE_USERNAME: `${URL.API_BASE_URL}/user/update_username`,
    }
}