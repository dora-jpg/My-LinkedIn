import {User} from "./user";
import {JobLike} from "./joblike";

export class Job {
  id: number;
  user: User;
  body: string;
  createdDate: Date;
}
