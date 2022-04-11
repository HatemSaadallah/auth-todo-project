import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, Headers } from "@nestjs/common";
import { AuthGuard } from "src/common/guards/auth.guard";
import { TodoService } from "./todo.service";
import { UserService } from "../user/user.service";
import { verifyToken } from "src/common/utils/jwt";
import { CreateTodoDto } from "./dto/todo.create.dto";
@Controller('todos')
export class TodoController {
    constructor(
        private readonly todoService: TodoService, 
        private readonly userService: UserService) {}
    
    @Post('create')
    async createTodo(@Body() createdTodoDto: CreateTodoDto, @Headers() headers): Promise<any> {
        return this.todoService.createTodo(body, headers);
    }

    @Get('/')
    getTodoByUsername(@Headers() headers): Promise<any> {
        let username = verifyToken(headers.token, process.env.JWTKEY);
        // @ts-ignore
        return this.todoService.getTodosByUsername(username.username);
    }
    @Delete('/:id')
    deleteTodoById(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return this.todoService.deleteTodoById(id);
    }
}