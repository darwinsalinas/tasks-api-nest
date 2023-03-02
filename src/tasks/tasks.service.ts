import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { User } from '../auth/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private userService: UsersService
  ) { }

  async create(createTaskDto: CreateTaskDto, user: User) {
    const userInDB = createTaskDto.userId
      ? await this.userService.findOne(createTaskDto.userId)
      : null;

    if (createTaskDto.userId && userInDB) {
      user = userInDB as User;
    }

    return this.tasksRepository.save({ ...createTaskDto, user });
  }

  findAll(pagination: PaginationDto) {
    const limit = pagination.limit || 10;
    const offset = pagination.offset || 0;

    return this.tasksRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string) {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);

    const userInDB = updateTaskDto.userId
      ? await this.userService.findOne(updateTaskDto.userId)
      : null;

    await this.tasksRepository.merge(task, updateTaskDto);

    if (updateTaskDto.userId && userInDB) {
      let updateUser = { user: userInDB };
      await this.tasksRepository.merge(task, updateUser);
    }

    await this.tasksRepository.save(task);

    return task;
  }

  async remove(uuid: string) {
    await this.findOne(uuid);

    await this.tasksRepository.delete(uuid);
    return;
  }
}
