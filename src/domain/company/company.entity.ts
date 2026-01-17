import { User } from "@domain/user/user.entity";
import { uuidv7 } from "uuidv7";

interface ICompany {
  name: string;
  users?: User[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class Company {
  private _id!: string;
  private props!: ICompany;

  private constructor(props: ICompany, id?: string) {
    this._id = id || uuidv7();

    if (!props) {
      //@ts-expect-error used by orm
      this.props = {};
      return;
    }

    this.props = {
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static create(props: ICompany, id?: string): Company {
    return new Company(props, id);
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get createdAt(): Date {
    return this.props.createdAt || new Date();
  }

  get updatedAt(): Date {
    return this.props.updatedAt || new Date();
  }

  set createdAt(date: Date) {
    this.props.createdAt = date;
  }

  set updatedAt(date: Date) {
    this.props.updatedAt = date;
  }

  get users() {
    return this.props.users || [];
  }

  set users(users: User[]) {
    this.props.users = users;
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.props.name,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}