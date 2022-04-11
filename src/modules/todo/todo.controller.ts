import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, Headers, Inject, CACHE_MANAGER } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/todo.create.dto";
import { Todos } from "./todo.model";
import { Cache } from "cache-manager";
import { UserObject } from "src/common/constants";

@Controller('todos')
export class TodoController {
    constructor(
        private readonly todoService: TodoService, 
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
        ) {}
    
    @Post('create')
    async createTodo(@Body() createdTodoDto: CreateTodoDto): Promise<Todos> {
        return this.todoService.createTodo(createdTodoDto);
    }

    @Get('/')
    async getTodoByUsername(): Promise<Todos[]> {

        const user: UserObject = await this.cacheManager.get('user');
        return this.todoService.getTodosByUsername(user);
    }
    @Delete('/:id')
    deleteTodoById(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return this.todoService.deleteTodoById(id);
    }
}