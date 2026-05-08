import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: 'uuid-string', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'john_doe', description: 'Username' })
  @Column({ type: 'varchar', unique: true })
  username: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address',
  })
  @Column({ type: 'varchar', unique: true })
  email: string;

  @ApiProperty({ example: 'hashed_password', description: 'Hashed password' })
  @Column({ type: 'varchar' })
  password: string;
}
