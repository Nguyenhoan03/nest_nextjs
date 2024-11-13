import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DetailProduct {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({type:'int'})
  product_id: number;

  @Column({type:'text'})
  key: string;

  @Column({type:'text'})
  value: string;
}