import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/todo.create.dto";
import { Todos } from "./todo.model";
import { UserObject } from "src/common/constants";
import { UserInfo } from "src/common/decorators/user.decorator";

@Controller('todos')
export class TodoController {
    constructor(
        private readonly todoService: TodoService, 

        ) {}
    
    @Post('create')
    async createTodo(@UserInfo() userInfo: any, @Body() createdTodoDto: CreateTodoDto): Promise<Todos> {
        return this.todoService.createTodo(createdTodoDto, userInfo);
    }

    @Get('/')
    async getTodoByUsername(@UserInfo() user: any): Promise<Todos[]> {
        return this.todoService.getTodosByUsername(user);
    }
    @Delete('/:id')
    deleteTodoById(@UserInfo() user: any, @Param('id', ParseIntPipe) id: number): Promise<string> {
        console.log(user.get({plain: true}));
        return this.todoService.deleteTodoById(user.id, id);
    }
}