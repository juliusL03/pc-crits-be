import _ from 'lodash';
import log from './log';
import response from './response';
import { uuidGen } from './string';
// if no error message body is provided by user, attempt to use the on in err obj
const extractErrMessage = (options, err) => {
    if (err.statusCode && err.statusCode === 403)
        return 'Login failed';
    if (options.msg)
        return options.msg;
    if (options.message)
        return options.message;
    if (typeof err === 'string')
        return err;
    const string = _.get(err, 'message');
    if (typeof string === 'string' && string.length > 0)
        return string;
    return '';
};
const useStatusCodeFromErrorIfAvailable = (options, err) => {
    const statusCodeFromErr = _.get(err, 'statusCode');
    if (statusCodeFromErr)
        return statusCodeFromErr;
    return options.statusCode;
};
const handleError = (error, res, options) => {
    const defaults = {
        errLocation: '',
        useUUID: false,
        statusCode: 500,
        printTrace: true,
        logging: true,
        messageToShow: null,
        hideMessage: false,
        // database logging options
        userId: false,
        requestBody: false,
        meta: false,
        type: null,
        emailNotification: process.env.ERROR_EMAIL_NOTIFICATION === 'true',
        message: undefined
    };
    // mixin options with defaults.
    // eslint-disable-next-line no-param-reassign
    options = _.extend(defaults, options);
    // error messaging.
    // extract the message
    const errMsg = extractErrMessage(options, error);
    // status code
    const statusCode = useStatusCodeFromErrorIfAvailable(options, error);
    let errUUID = '';
    if (options.useUUID) {
        errUUID = uuidGen();
    }
    if (options.logging)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        log.error(`ERROR: ${errUUID}, ${options.errLocation}, ${errMsg}`);
    // if printTrace is true and err is an object, print the trace.
    if (options.printTrace && options.logging)
        log.error('ERROR_TRACE:', error.stack);
    if (typeof res === 'object' && res !== null) {
        const environment = process.env.NODE_ENV ?? '';
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const message = ['production', 'staging'].includes(environment)
            ? 'We are updating our servers to serve you better. We apologise for the inconvenience'
            : `${options.message} ${error.stack}`;
        res
            .status(statusCode)
            .send(response(false, null, statusCode === 403 ? 'Authentication failed' : message, `${errMsg} Error ID: ${errUUID}`));
    }
};
export default handleError;
