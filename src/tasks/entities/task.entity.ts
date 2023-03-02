import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../enums/task-status.enum';


@Entity({ name: 'tasks' })
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'enum', default: TaskStatus.TODO, enum: TaskStatus })
    status: TaskStatus;

    @ManyToOne(type => User, user => user.tasks, { eager: true })
    user: User

}