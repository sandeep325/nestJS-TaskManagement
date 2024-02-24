import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create_task.dto';
import { GetTaskFilterDto } from './dto/get_task_filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }
    @Get()
    getAllTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.GetTaskWithFilter(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    // @Post()
    // CreateTask(@Body('title') title:string, @Body('description') description:string):Task {
    //     console.log('body data', description);
    //     return this.tasksService.CreateTask(title,description);

    // }

    @Post()
    CreateTask(@Body() CreateTaskDto: CreateTaskDto): Task {
        // console.log('body data', description);
        return this.tasksService.CreateTask(CreateTaskDto);

    }


    @Get('/:id')
    GetTaskById(@Param('id') id: string): Task {
        const Data =  this.tasksService.GetTaskById(id);

        if(!Data) {

            throw new NotFoundException(`Task id with: ${id} is not found.`);
        } else {
            return Data;
        }
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    UpdateTaslStatus(@Param('id') id: string, @Body() UpdateTaskStatusDto:UpdateTaskStatusDto): Task {
      const {status}  = UpdateTaskStatusDto;
        return this.tasksService.UpdateTaskStatus(id, status);
    }
}
