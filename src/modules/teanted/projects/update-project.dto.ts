import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
