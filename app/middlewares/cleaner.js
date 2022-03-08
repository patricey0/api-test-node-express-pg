const sanitizer = require('sanitizer');


const sanitize = obj => {
    for (const prop in obj) {
        obj[prop] = sanitizer.escape(obj[prop]);
    }
}

const cleaner = (request, _, next) => {
    //sanitize params from request
    sanitize(request.params);
    //sanitize query from request
    sanitize(request.query);
    if (request.body) {
        sanitize(request.body);
    }
    next();
}

module.exports = cleaner;