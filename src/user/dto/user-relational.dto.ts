import { UserDto } from "./user.dto";

export class UserRelationalDto extends UserDto {
  books?: {
    past: BorrowedBookDto[];
    present: BorrowedBookDto[];
  };
}

export class BorrowedBookDto {
  name: string;
  userScore?: number;
}
