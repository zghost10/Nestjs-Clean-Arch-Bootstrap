import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateCompanyDto {
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  name: string;
}
