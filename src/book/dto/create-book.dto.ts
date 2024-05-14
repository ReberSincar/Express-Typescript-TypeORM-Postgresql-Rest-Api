import { IsDefined, IsString, Length } from "class-validator";

export class CreateBookDto {
  @IsDefined()
  @IsString()
  @Length(2)
  name: string;
}
