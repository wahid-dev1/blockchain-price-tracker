import {Entity, PrimaryGeneratedColumn,Column,CreateDateColumn} from 'typeorm'

@Entity()
export class Price{
  @PrimaryGeneratedColumn()
  id: number;
  @Column("float")
  price: number;
  @Column()
  chain: string;
  @CreateDateColumn()
  createdAt: Date; 
}