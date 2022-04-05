import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, Headers } from "@nestjs/common";
import { AuthGuard } from "src/common/guards/auth.guard";
import { TodoService } from "./todo.service";
import { UserService } from "../user/user.service";
@Controller('todos')
export class TodoController {
    constructor(
        private readonly todoService: TodoService, 
        private readonly userService: UserService) {}
    
    // @Get('/')
    // getAllTodos(): Promise<any> {
    //     return this.todoService.getAllTodos();
    // }

    @Post('create')
    @UseGuards(AuthGuard)
    createTodo(@Body() body, @Headers() headers): Promise<any> {
        return this.todoService.createTodo(body, headers);
    }

    @Get('/')
    @UseGuards(AuthGuard)
    getTodoByUsername(@Body('username') username: string): Promise<any> {
        return this.todoService.getTodosByUsername(username);
    }
    @Delete('/:id')
    deleteTodoById(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return this.todoService.deleteTodoById(id);
    }

}