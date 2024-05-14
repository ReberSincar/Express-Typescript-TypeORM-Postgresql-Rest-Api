import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";
import { Book } from "../../book/entity/book.entity";

@Entity("user_books")
export class UserBook extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: User;

  @Column()
  bookId: number;

  @ManyToOne(() => Book, (book) => book.users)
  @JoinColumn({ name: "bookId", referencedColumnName: "id" })
  book: Book;

  @Column({ nullable: true })
  userScore: number;

  @CreateDateColumn()
  createdAt: Date;
}
