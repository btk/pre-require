import {loopDirectory} from '../lib/loop-directory'
import {assetsLength} from './utils'

jest.mock('fs', () => {
    const items = ['path/to/file/1', 'path/to/file/2', 'path/to/file/3'];

    return {
        readdir: jest.fn((path, cb) => {
            cb(null, items)
        }),
        lstatSync: jest.fn().mockReturnValue({
            isDirectory: jest.fn()
        })
    };
});

import fs from 'fs';

describe('Loop directory Test', () => {

    let directoryItems;

    beforeEach(() => {
        directoryItems = ['path/to/file/1', 'path/to/file/2', 'path/to/file/3'];
    });

    test('should return a Promise', () => {
        expect(loopDirectory('./test-assets', {}).then).toBeDefined();
    });

    test('should read the directory', () => {
        const spy = jest.spyOn(fs, 'readdir');
        const filePath = './test-assets';

        loopDirectory(filePath, {});

        expect(spy).toHaveBeenCalledWith(filePath, expect.any(Function));
    });

    test('Should return the files length in folder', async () => {
        const assets = await loopDirectory('./test-assets', {});

        expect(assetsLength(assets)).toEqual(directoryItems.length);
    });

});