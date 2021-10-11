const { join } = require('path');
const { 
    readDirectory, 
    elementsTerminatedWith, 
    readFiles,
    merge,
    splitTextBy,
    clearEmpty,
    clearIfInclude,
    clearIfOnlyIncludeNumbers,
    clearSymbols,
    group,
    orderBy,
} = require('./utils');

const path = join(__dirname, 'files');

const symbols = [
    '.', '?', '-', ',', '"', '♪',
    '_', '<i>', '</i>', '\r', '[', ']',
    '(', ')'
]

readDirectory(path)
    .then(elementsTerminatedWith('.srt'))
    .then(readFiles)
    .then(merge)
    .then(splitTextBy('\n'))
    .then(clearEmpty)
    .then(clearIfInclude('-->'))
    .then(clearIfOnlyIncludeNumbers)
    .then(clearSymbols(symbols))
    .then(merge)
    .then(splitTextBy(' '))
    .then(clearEmpty)
    .then(clearIfOnlyIncludeNumbers)
    .then(group)
    .then(orderBy('quantity', 'desc'))
    .then(console.log);

