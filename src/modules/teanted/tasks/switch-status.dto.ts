import { IsNotEmpty } from 'class-validator';
import { StatusType } from './task.entity';

export class SwitchTaskStatusDto {
  @IsNotEmpty()
  status: StatusType;
}
