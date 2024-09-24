const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src'); // Папката src

function searchFiles(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach((file) => {
            const filePath = path.join(dir, file);
            fs.stat(filePath, (err, stat) => {
                if (err) {
                    return console.log('Unable to stat file: ' + err);
                }

                if (stat.isDirectory()) {
                    searchFiles(filePath); // Рекурсивно обхождане на поддиректории
                } else if ((filePath.endsWith('.ts') || filePath.endsWith('.tsx')) &&
                           !filePath.includes('.resolver') &&
                           path.basename(filePath) !== 'types.ts') {
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            return console.log('Unable to read file: ' + err);
                        }

                        if (data.includes('export type')) {
                            console.log(filePath);
                        }
                    });
                }
            });
        });
    });
}

searchFiles(directoryPath);