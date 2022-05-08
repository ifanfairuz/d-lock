import CryptoJS from 'crypto-js';

export const encryptText = (message, password) => {
    return CryptoJS.AES.encrypt(message, password).toString();
}

export const decryptText = (cipher, password) => {
    return CryptoJS.AES.decrypt(cipher, password).toString(CryptoJS.enc.Utf8);
}

export const encrypt = (message, password) => {
    const payload = {
        version: '0.1',
        cipher: encryptText(message, password)
    }
    return encryptText(JSON.stringify(payload), password);
}

export const decrypt = (cipher, password) => {
    try {
        const payload = JSON.parse(decryptText(cipher, password) ?? '{}');
        return 'cipher' in payload ? decryptText(payload.cipher, password) : null;
    } catch (error) {
        return null;
    }
}