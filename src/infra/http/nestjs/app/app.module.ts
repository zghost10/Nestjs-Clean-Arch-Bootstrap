import { Module } from '@nestjs/common';
import { AppController } from '@infra/http/nestjs/app/app.controller';
import { AppService } from '@infra/http/nestjs/app/app.service';
import { UserModule } from '@infra/http/nestjs/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '@infra/db/typeorm/user/user.schema';
import { CompanyModule } from '@infra/http/nestjs/company/company.module';
import { CompanySchema } from '@infra/db/typeorm/company/company.schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [UserSchema, CompanySchema],
      synchronize: true,
      logging: true
    }),
    UserModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
