import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('tasks')
@ApiTags('Tasks')
@Auth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {

    return this.tasksService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.tasksService.findOne(uuid);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) uuid: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(uuid, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.tasksService.remove(uuid);
  }
}
