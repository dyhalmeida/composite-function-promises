const { readdirSync, readFileSync } = require('fs');
const { join } = require('path');

function readDirectory(path = '') {
    return new Promise((resolve, reject) => {
        try {
            const files = readdirSync(path)
                .map(file => join(path, file));
            resolve(files);
        } catch (error) {
            reject(error);
        }
    })
}

function filterTerminateWith(pattern = '') {
    return function(arr = []) {
        return arr.filter(el => el.endsWith(pattern));
    }
}

function readFile(path = '') {
    return new Promise((resolve, reject) => {
        try {
            const content = readFileSync(path, { encoding: 'utf-8' });
            resolve(content.toString());
        } catch (error) {
            reject(error);
        }
    });
}

function readFiles(paths = []) {
    return Promise.all(
        paths.map(path => readFile(path))
    );
}

function merge(arr = []) {
    return arr.join(' ');
}

function splitBy(symbol = '') {
    return function(text = '') {
        return text.split(symbol);
    }
}

function clearEmpty(arr = []) {
    return arr.filter(el => el.trim());
}

function clearIfInclude(pattern = '') {
    return function(arr = []) {
        return arr.filter(el => !el.includes(pattern));
    }
}

function clearIfOnlyIncludeNumbers(arr = []) {
    return arr.filter(el => {
        const num = parseInt(el.trim());
        return num !== num;
    })
}

function clearSymbols(symbols = []) {
    return function(arr = []) {
        return arr.map(el => {
            return symbols.reduce((acc, symbol) => {
                return acc.split(symbol).join('');
            }, el)
        })
    }
}

function agroup(words = []) {
    return Object.values(
        words.reduce((acc, word) => {
            const el = word.toLowerCase();
            const quantity = acc[el] ? acc[el].quantity + 1 : 1;
            acc[el] = { data: el, quantity };
            return acc;
        }, {})
    );
}

function orderBy(attr, order = 'asc') {
    return function(arr = []) {
        const asc = (object1, object2) => object1[attr] - object2[attr];
        const desc = (object1, object2) => object2[attr] - object1[attr];
        return [...arr].sort(order === 'asc' ? asc : desc);

    }
}


module.exports = {
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
}