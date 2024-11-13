import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, nullable: true })
    username: string; 

    @Column({ length: 255, nullable: true })
    password: string; 

    @Column({ length: 100, nullable: true, unique: true })
    email: string; 

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date; 

    @Column({ length: 255, nullable: true, unique: true })
    google_id: string; 

    @Column({ length: 255, nullable: true, unique: true })
    facebook_id: string;
}