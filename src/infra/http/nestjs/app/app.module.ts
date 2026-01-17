import { Module } from '@nestjs/common';
import { AppController } from '@infra/http/nestjs/app/app.controller';
import { AppService } from '@infra/http/nestjs/app/app.service';
import { UserModule } from '@infra/http/nestjs/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '@infra/db/typeorm/user/user.schema';
import { CompanyModule } from '@infra/http/nestjs/company/company.module';
import { CompanySchema } from '@infra/db/typeorm/company/company.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
  providers: [AppService],
})
export class AppModule { }
