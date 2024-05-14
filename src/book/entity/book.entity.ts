import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { UserBook } from "../../user/entity/user_book.entity";
import { BookDto } from "../dto/book.dto";

@Entity("books")
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "float", default: 0 })
  totalScore: number;

  @Column({ default: 0 })
  scoringCount: number;

  @OneToMany(() => UserBook, (user) => user.book)
  users: UserBook[];

  toBookDto() {
    const dto: BookDto = {
      id: this.id,
      name: this.name,
    };
    return dto;
  }

  toBookDtoWithScore() {
    const dto: BookDto = {
      id: this.id,
      name: this.name,
      score: this.getTotalScore(),
    };
    return dto;
  }

  getTotalScore() {
    return this.totalScore ? this.totalScore / this.scoringCount : -1;
  }
}
