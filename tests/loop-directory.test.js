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

describe('Loop Directory', () => {

    let filePath;
    let directoryItems;

    beforeEach(() => {
        filePath = './test-assets';
        directoryItems = ['path/to/file/1', 'path/to/file/2', 'path/to/file/3'];
    });

    test('should return a Promise', () => {
        expect(loopDirectory(filePath, {}).then).toBeDefined();
    });

    test('should read the directory', () => {
        loopDirectory(filePath, {});

        expect(fs.readdir).toHaveBeenCalledWith(filePath, expect.any(Function));
    });

    test('should return the files length in folder', async () => {
        const assets = await loopDirectory('./test-assets', {});

        expect(assetsLength(assets)).toEqual(directoryItems.length);
    });

    describe('Directory Items', () => {

        test('should retrieve file stats for each file within the directory', (done) => {
            fs.lstatSync.mockClear();

            loopDirectory(filePath, {})
                .then(() => {
                    expect(fs.lstatSync).toHaveBeenCalledTimes(directoryItems.length);

                    done();
                });


        });

        test('should append a forward slash when the provided directory path did NOT have one', (done) => {
            const expectedPath = `${filePath}/${directoryItems[0]}`;

            fs.lstatSync.mockClear();

            loopDirectory(filePath, {})
                .then(() => {
                    expect(fs.lstatSync.mock.calls[0][0]).toEqual(expectedPath);

                    done();
                });


        });

        test('should NOT append a forward slash when the provided directory path did have one', (done) => {
            const expectedPath = `${filePath}/${directoryItems[0]}`;

            fs.lstatSync.mockClear();

            loopDirectory(`${filePath}/`, {})
                .then(() => {
                    expect(fs.lstatSync.mock.calls[0][0]).toEqual(expectedPath);

                    done();
                });


        })

        test('should resolve with an object of path:require key/value pairs', async () => {
            const assets = await loopDirectory(filePath, {});

            expect(assets).toEqual(expect.objectContaining({
                'path/to/file/1': 'require(\'./test-assets/path/to/file/1\')',
                'path/to/file/2': 'require(\'./test-assets/path/to/file/2\')',
                'path/to/file/3': 'require(\'./test-assets/path/to/file/3\')'
            }));
        });
    });

});