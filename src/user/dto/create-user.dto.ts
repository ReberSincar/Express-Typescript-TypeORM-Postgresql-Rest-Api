import { IsDefined, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @Length(2)
  name: string;
}
