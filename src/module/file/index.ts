import { saveAs } from 'file-saver';

export const exportFile = (content) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    return saveAs(blob, 'd-lock.lock');
}

export const processFile = (file: File) => {
    return file.text();
}