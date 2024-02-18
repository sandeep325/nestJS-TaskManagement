import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create_task.dto';
import { GetTaskFilterDto } from './dto/get_task_filter.dto';
@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    getAllTasks() {
        return this.tasks;
    }


    CreateTask(CreateTaskDto: CreateTaskDto): Task {
        const { title, description } = CreateTaskDto;
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    GetTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id);
    }

    // DeleteTaskById(id: string): Task {
    //     return this.tasks.filter((task)=> task.id!==id);
    // }

    deleteTask(id: string): void {
        this.tasks.filter((task) => task.id !== id);
    }

    UpdateTaskStatus(id: string, status: TaskStatus) {
        const task = this.GetTaskById(id);
        task.status = status;
        return task;
    }


    GetTaskWithFilter(filterDto: GetTaskFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }
        if (search) {
            tasks = tasks.filter((task) => {
                if (task.title.includes(search) || task.description.includes(search)) {
                    return true;
                }
                return false;
            });
        }
        return tasks;
    }

}
