import { IsBooleanString, IsString } from "class-validator";

export class queryParamsDto {
    @IsString()
    category: string;

    @IsBooleanString()
    is_new: string

    @IsBooleanString()
    discount: string
}