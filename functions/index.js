
require('./voice').init();

const Multivocal = require('multivocal');
exports.webhook = Multivocal.processFirebaseWebhook;
