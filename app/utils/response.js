import { Environment } from './types';
export default (success, data = null, message = null, devMessage = null) => {
    const resp = {
        success
    };
    if (data !== null && data !== undefined) {
        Object.keys(data).forEach((key) => {
            resp[key] = data[key];
        });
    }
    if (Array.isArray(message)) {
        resp.message = message.join(', ');
    }
    else {
        resp.message = message;
    }
    if (process.env.NODE_ENV === Environment.DEV || process.env.NODE_ENV === Environment.LOCAL) {
        resp.devMessage = devMessage;
    }
    return resp;
};
