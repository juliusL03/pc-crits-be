import { dirname, join } from 'path';
import { readdirSync, lstatSync } from 'fs';
import { fileURLToPath } from 'url';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
const _dirname = dirname(fileURLToPath(import.meta.url));
const localesFolder = join(_dirname, './locales');

i18next.use(Backend).init({
    initImmediate: false,
    fallbackLng: 'en',
    preload: readdirSync(localesFolder).filter((fileName) => {
        const joinedPath = join(localesFolder, fileName);
        return lstatSync(joinedPath).isDirectory();
    }),
    backend: {
        loadPath: join(localesFolder, '{{lng}}.json')
    }
});
export default i18next;
