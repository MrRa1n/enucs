import log4js from 'log4js';

log4js.configure({
    appenders: {
        errors: { type: 'fileSync', filename: 'enucs.log', level: 'all' },
        console: { type: 'console' }
    },
    categories: {
        default: { appenders: ['console', 'errors'], level: 'all' }
    }
});

export const logger = log4js.getLogger('default');