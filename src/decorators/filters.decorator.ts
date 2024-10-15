import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Filters = createParamDecorator((data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    const {category, isNew, discount} = request.params
    console.log("Passou")
    return {
        category, 
        isNew,
        discount, 
    }
})