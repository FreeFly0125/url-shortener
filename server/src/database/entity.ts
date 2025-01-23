import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "url" })
export class UrlEntity {
  @PrimaryGeneratedColumn({ name: "id" })
    id: number;

  @Column({ name: "origin", type: "varchar", length: "256" })
    origin: string;

  @Column({ name: "shorten", type: "varchar", length: "32" })
    shorten: string;

  @Column({ name: "username", type: "varchar", length: "32" })
    username: string;
}

@Entity({ name: "auth" })
export class AuthEntity {
  @PrimaryGeneratedColumn({ name: "id" })
    id: number;

  @Column({ name: "username", type: "varchar", length: "32" })
    username: string;

  @Column({ name: "password", type: "varchar", length: "32" })
    password: string;
}
