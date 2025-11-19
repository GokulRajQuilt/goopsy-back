import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user_details_model";

@Entity({ name: "businesses" })
export class Business {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  businessName: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ nullable: true })
  coverImageUrl: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  category: string; // example: food, beauty, service

  @Column({ nullable: true })
  location: string;

  @Column({ default: true })
  isActive: boolean;

  // FK → User
  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  owner: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
