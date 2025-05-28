import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../common/db/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
