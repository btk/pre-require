const fs = require('fs');

export const loopDirectory = (path, obj) => {
    let directoryToRead = [];

    return new Promise((resolve) => {

        fs.readdir(path, (err, items) => {

            items.forEach((file) => {
                let prePath = (path[path.length - 1] === "/") ? path : path + "/";
                let stats = fs.lstatSync(prePath + file);
                let normalizeFileName = file.replace('.', '_').replace(/-/g, '_');

                if (stats.isDirectory()) {
                    obj[normalizeFileName] = {};

                    // push it to the array so that we can loop
                    // and perform recursion based on that folder
                    directoryToRead.push({
                        normalizeFileName,
                        path: prePath + file
                    });

                } else {
                    obj[normalizeFileName] = `require('${prePath + file}')`;

                }

            });

            if (directoryToRead.length === 0) {
                // if no more directory to read then we resolve it
                resolve(obj);

            } else {
                // if let say more than 1 directory inside the
                // folder then we need to resolve when everything have been resolved
                let promises = directoryToRead.map(val => {
                    return loopDirectory(val.path, obj[val.normalizeFileName])
                });

                Promise.all(promises)
                    .then(() => {
                        resolve(obj);
                    });
            }
        });
    });
};