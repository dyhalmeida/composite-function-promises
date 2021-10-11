const { join } = require('path');
const { 
    readDirectory, 
    filterTerminateWith, 
    readFiles,
    merge,
    splitBy,
    clearEmpty,
    clearIfInclude,
    clearIfOnlyIncludeNumbers,
    clearSymbols,
    agroup,
    orderBy,
} = require('./utils');

const path = join(__dirname, 'files');

const symbols = [
    '.', '?', '-', ',', '"', '♪',
    '_', '<i>', '</i>', '\r', '[', ']',
    '(', ')'
]

readDirectory(path)
    .then(filterTerminateWith('.srt'))
    .then(readFiles)
    .then(merge)
    .then(splitBy('\n'))
    .then(clearEmpty)
    .then(clearIfInclude('-->'))
    .then(clearIfOnlyIncludeNumbers)
    .then(clearSymbols(symbols))
    .then(merge)
    .then(splitBy(' '))
    .then(clearEmpty)
    .then(clearIfOnlyIncludeNumbers)
    .then(agroup)
    .then(orderBy('quantity', 'desc'))
    .then(console.log);

