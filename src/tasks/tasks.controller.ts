import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  HttpStatus
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { userShemaExample } from '../users/dto/create-user.dto';
import { HttpCode } from '@nestjs/common';

@Controller('tasks')
@ApiTags('Tasks')
@Auth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @ApiResponse({ status: HttpStatus.OK, schema: { example: userShemaExample } })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Error creating resource' })
  create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, schema: { example: [userShemaExample] } })
  findAll(@Query() pagination: PaginationDto) {

    return this.tasksService.findAll(pagination);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, schema: { example: userShemaExample } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Resource not found' })
  findOne(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.tasksService.findOne(uuid);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, schema: { example: userShemaExample }, description: 'Resource updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Resource not found' })
  update(
    @Param('id', ParseUUIDPipe) uuid: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(uuid, updateTaskDto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Resource deleted succesfuly' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Resource not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.tasksService.remove(uuid);
  }
}
