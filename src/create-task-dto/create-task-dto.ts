import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TaskCategory } from '@prisma/client';
export class CreateTaskDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ enum: TaskCategory })
  category: string;

  @ApiProperty()
  assignedUser: string;

  @IsNotEmpty()
  @ApiProperty()
  createdUser: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

}