import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {UserRepository} from './user-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AuthModule} from "../auth/auth.module";
import {LocalFileModule} from "../local-file/local-file.module"



@Module({
  imports: [forwardRef(() => AuthModule),forwardRef(() => LocalFileModule),TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
