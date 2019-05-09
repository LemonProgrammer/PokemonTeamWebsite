const test = require('./test/test.js');
exports.index = (req, res) => {
    res.send(test.start());
};