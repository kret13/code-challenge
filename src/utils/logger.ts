import { format, createLogger, transports } from 'winston';

const { combine, printf } = format;

const customFormat = printf(({ level, message }) => {
    return ` [ ${level.toUpperCase()} ] : ${message}`;
});

export const logger = createLogger({
    level: 'warn',
    format: combine(customFormat),
    transports: [new transports.Console()],
});
