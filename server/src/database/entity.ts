import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "url" })
export class UrlEntity {
  @PrimaryGeneratedColumn({ name: "id" })
    id: number;

  @Column({ name: "origin", type: "varchar", length: "256" })
    origin: string;

  @Column({ name: "shorten", type: "varchar", length: "32" })
    shorten: string;
}
