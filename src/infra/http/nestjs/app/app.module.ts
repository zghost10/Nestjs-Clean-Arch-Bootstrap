import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from '@infra/http/nestjs/app/app.controller';
import { AppService } from '@infra/http/nestjs/app/app.service';
import { UserModule } from '@infra/http/nestjs/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '@infra/db/typeorm/user/user.schema';
import { CompanyModule } from '@infra/http/nestjs/company/company.module';
import { CompanySchema } from '@infra/db/typeorm/company/company.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  PrometheusModule,
  makeCounterProvider,
  makeHistogramProvider,
} from '@willsoto/nestjs-prometheus';
import { MetricsInterceptor } from '@infra/http/nestjs/common/metrics.interceptor';
import { LoggerModule } from '@infra/logging/logger.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    PrometheusModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', `.env.${process.env.NODE_ENV}`, '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [UserSchema, CompanySchema],
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        logging: configService.get<string>('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    UserModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    makeCounterProvider({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'path', 'status'],
    }),
    makeHistogramProvider({
      name: 'http_request_duration_seconds',
      help: 'HTTP request duration in seconds',
      labelNames: ['method', 'path', 'status'],
      buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
    }),
    makeCounterProvider({
      name: 'http_status_codes_total',
      help: 'Total number of HTTP responses by status code',
      labelNames: ['status', 'method', 'path'],
    }),
    makeCounterProvider({
      name: 'http_response_size_bytes_total',
      help: 'Total size of HTTP responses in bytes',
      labelNames: ['method', 'path'],
    }),
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
  ],
})
export class AppModule {}


