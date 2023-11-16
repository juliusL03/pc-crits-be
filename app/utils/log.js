import debug from 'debug';
import path from 'path';
const log = (type, message, data, localNamespace) => {
    let rootNamespace;
    switch (type) {
        case 'info':
            rootNamespace = 'app:info';
            break;
        case 'warning':
            rootNamespace = 'app:warning';
            break;
        case 'error':
            rootNamespace = 'app:error';
            break;
        default:
            rootNamespace = 'app';
            break;
    }
    if (localNamespace) {
        const relativePath = path.relative(`${process.cwd()}/app`, localNamespace);
        const pathWithoutExtension = relativePath.split('.')[0];
        const sanitizedPath = pathWithoutExtension.replace(/\//g, ':');
        if (sanitizedPath) {
            rootNamespace += `:${sanitizedPath}`;
        }
        else {
            rootNamespace += `:${localNamespace}`;
        }
    }
    debug(rootNamespace)(process.env.DEBUG_FORMAT ?? '%O', message, data ?? '');
};
const error = (message, data = '', namespace = '') => {
    log('error', message, data, namespace);
};
const warning = (message, data = '', namespace = '') => {
    log('warning', message, data, namespace);
};
const info = (message, data = '', namespace = '') => {
    log('info', message, data, namespace);
};
export default { error, warning, info };
