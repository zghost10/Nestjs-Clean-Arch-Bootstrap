import { uuidv7 } from 'uuidv7';

interface IUser {
  name: string;
  email: string;
  password: string;
}

export class User {
  private _id!: string;
  private props!: Required<IUser>;

  private constructor(props?: IUser, id?: string) {
    this._id = id || uuidv7();

    if (!props) {
      //@ts-expect-error used by orm
      this.props = {};
      return;
    }

    this.props = props;
  }

  static create(props: IUser, id?: string): User {
    return new User(props, id);
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.props.name,
      email: this.props.email,
    };
  }
}
