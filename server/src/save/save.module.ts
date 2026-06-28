import { Module } from '@nestjs/common';
import { SaveController } from './save.controller';
import { SaveService } from './save.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Save } from '../../common/models/entities/Save.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Save]), AuthModule],
  controllers: [SaveController],
  providers: [SaveService],
  exports: [SaveService],
})
export class SaveModule {}
