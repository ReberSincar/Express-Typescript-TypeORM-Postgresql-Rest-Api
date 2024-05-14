import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { UserBook } from "./user_book.entity";
import { UserDto } from "../dto/user.dto";
import { BorrowedBookDto, UserRelationalDto } from "../dto/user-relational.dto";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserBook, (book) => book.user)
  books: UserBook[];

  toUserRelationalDto() {
    const dto: UserRelationalDto = {
      id: this.id,
      name: this.name,
      books: {
        past: this.books
          .filter((e) => e.userScore != null)
          .map((e) => {
            const borrowedBookDto: BorrowedBookDto = {
              name: e.book.name,
              userScore: e.userScore,
            };
            return borrowedBookDto;
          }),
        present: this.books
          .filter((e) => e.userScore == null)
          .map((e) => {
            const borrowedBookDto: BorrowedBookDto = {
              name: e.book.name,
              userScore: e.userScore ?? undefined,
            };
            return borrowedBookDto;
          }),
      },
    };
    return dto;
  }

  toUserDto() {
    const dto: UserDto = {
      id: this.id,
      name: this.name,
    };
    return dto;
  }
}
