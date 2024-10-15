import { IsString } from "class-validator";

export class queryParamsDto {
    @IsString()
    category: string
}