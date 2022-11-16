import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
