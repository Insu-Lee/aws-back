import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../common/db/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findOne(userId: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { userId } });
    return user ?? undefined;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({
      ...createUserDto,
    });
    return this.userRepository.save(newUser);
  }
}
