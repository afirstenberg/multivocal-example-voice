
require('./voice').init();
require('./conversation').init();

const Multivocal = require('multivocal');
exports.webhook = Multivocal.processFirebaseWebhook;
