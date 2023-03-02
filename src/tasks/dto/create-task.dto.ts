import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { User } from "src/auth/entities/user.entity";
import { TaskStatus } from "../enums/task-status.enum";

export class CreateTaskDto {

    @IsString()
    @MinLength(3)
    @MaxLength(200)
    @ApiProperty({ minLength: 3, maxLength: 200 })
    title: string;

    @IsString()
    @MinLength(3)
    @MaxLength(500)
    @ApiProperty({ minLength: 3, maxLength: 500 })
    description: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    @ApiProperty({ enum: TaskStatus, default: TaskStatus.TODO })
    status?: TaskStatus;

    @IsUUID()
    @ApiProperty({ type: String, format: 'uuid' })
    @IsOptional()
    userId?: string;
}
