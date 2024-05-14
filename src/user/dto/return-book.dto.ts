import { IsDefined, IsNumber, Max, Min } from "class-validator";

export class ReturnBookDto {
  @IsDefined()
  @IsNumber()
  @Min(1)
  @Max(10)
  score: number;
}
