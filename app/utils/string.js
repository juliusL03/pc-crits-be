import { v4 as uuidv4 } from 'uuid';
export const capitalize = (str) => {
    const arr = str.split(' ');
    for (let i = 0; i < arr.length; i += 1) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(' ');
};
export const pascalToSnakeCase = (str) => 
str.replace(/\.?([A-Z]+)/g, (x, y) => `-${y.toLowerCase()}`).replace(/^-/, '');
export const uuidGen = () => uuidv4();
