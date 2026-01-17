import { uuidv7 } from 'uuidv7';
import { Company } from '@domain/company/company.entity';

interface IUser {
  name: string;
  email: string;
  password: string;
  company?: Company | null;
  companyId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
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

    this.props = {
      ...props,
      company: props.company || null,
      companyId: props.companyId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
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

  get createdAt(): Date {
    return this.props.createdAt || new Date();
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt || new Date();
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  get companyId(): string | null {
    return this.props.companyId || null;
  }

  set companyId(companyId: string | null) {
    this.props.companyId = companyId;
  }

  get company(): Company | null {
    return this.props.company || null;
  }

  set company(company: Company | null) {
    this.props.company = company;
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.props.name,
      email: this.props.email,
      companyId: this.props.companyId,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
