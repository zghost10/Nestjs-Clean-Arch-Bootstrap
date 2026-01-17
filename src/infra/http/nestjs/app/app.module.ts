import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { UserController } from '../user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from 'src/infra/db/typeorm/user.schema';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [UserSchema],
      synchronize: true,
      logging: true
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule { }
