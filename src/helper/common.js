const moment = require('moment');
const DATE_FORMAT = 'YYYY-MM-HH';

const objectControl = (element) => {
    if (typeof element !== 'object') {
        return 'Argument "elementId" is not a object!';
    }
};


const dateFunction = (startDate, endDate) => {
    if (startDate < endDate) {
        return true;
    } else {
        return false;
    }
}

const countFunction = (min, max) => {
    if (min < max) {
        return true;
    } else {
        return false;
    }
}

const dateFormat = (date) => {
    if (moment(date, DATE_FORMAT).format(DATE_FORMAT) === date) {
        return true;
    } else {
        return false;
    }
}

module.exports = { objectControl, dateFunction, dateFormat, countFunction };
