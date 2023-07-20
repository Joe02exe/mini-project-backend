import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { TaskCategory } from '@prisma/client';
export class CreateTaskDto {

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: TaskCategory})
  @IsNotEmpty()
  @IsOptional()
  category: TaskCategory = TaskCategory.other;

  @ApiProperty()
  @IsNotEmpty()
  assignedUser: string;

  @IsNotEmpty()
  @ApiProperty()
  createdUser: string;

  @ApiProperty()
  @IsOptional()
  description: string;
}