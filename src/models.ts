import mugshot from "./assets/images/mugshot.png"

export enum UserTypes {
    STUDENT = "student",
    FACULTY = "faculty",
}

export class User {
    constructor(private _id: number, private _firstname: string, private _lastname: string, private _userType: UserTypes, private _profilePicture?: string) { }

    public get id(): number {
        return this._id
    }

    public get firstname(): string {
        return this._firstname
    }

    public get lastname(): string {
        return this._lastname
    }

    public get fullname(): string {
        return `${this._firstname} ${this._lastname}`
    }

    public get userType(): UserTypes {
        return this._userType
    }

    public get profilePicture(): string {
        return this._profilePicture ?? mugshot
    }
}

export interface Course {
    id: number,
    title: string,
    subtitle: string | undefined,
    instructor?: User
}

export interface Comment {
    id: number,
    body: string,
    writer: User,
    createdAt: Date,
    lastUpdated?: Date
}

export interface Post {
    id: number,
    body: string,
    writer: User,
    createdAt: Date,
    lastUpdated?: Date,
}
