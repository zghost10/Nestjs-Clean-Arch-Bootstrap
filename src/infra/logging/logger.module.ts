import { DynamicModule, Module } from '@nestjs/common';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import LokiTransport from 'winston-loki';

@Module({})
export class LoggerModule {
  static forRoot(): DynamicModule {
    const isProduction = process.env.NODE_ENV === 'production';
    const lokiHost = process.env.LOKI_HOST || 'http://localhost:3100';

    if (isProduction) {
      return {
        module: LoggerModule,
        imports: [
          WinstonModule.forRoot({
            transports: [
              new winston.transports.Console({
                format: winston.format.combine(
                  winston.format.timestamp(),
                  winston.format.json(),
                ),
              }),
            ],
          }),
        ],
        exports: [WinstonModule],
      };
    }

    return {
      module: LoggerModule,
      imports: [
        WinstonModule.forRoot({
          transports: [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.ms(),
                nestWinstonModuleUtilities.format.nestLike('CleanAPI', {
                  colors: true,
                  prettyPrint: true,
                }),
              ),
            }),

            new LokiTransport({
              host: lokiHost,
              labels: { app: 'clean-api', env: 'development' },
              json: true,
              format: winston.format.json(),
              replaceTimestamp: true,
              onConnectionError: (err: Error) => {
                console.error('[LokiTransport] Erro de conexão:', err.message);
              },
            }),
          ],
        }),
      ],
      exports: [WinstonModule],
    };
  }
}
