import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/common/guards/auth.guard";
import { TodoService } from "./todo.service";

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}
    
    @Get('/')
    getAllTodos(): Promise<any> {
        return this.todoService.getAllTodos();
    }

    @Post('create')
    @UseGuards(AuthGuard)
    createTodo(@Body() body): Promise<any> {
        return this.todoService.createTodo(body);
    }

    @Delete('/:id')
    deleteTodoById(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return this.todoService.deleteTodoById(id);
    }

}