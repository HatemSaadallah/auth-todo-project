import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { TodoProvider } from "./todo.provider";
@Module({
    imports: [],
    controllers: [TodoController],
    providers: [TodoService, ...TodoProvider],
})

export class TodoModule {}