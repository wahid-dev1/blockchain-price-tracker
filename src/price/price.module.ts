import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import {Price} from './price.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[TypeOrmModule.forFeature([Price])],
  providers: [PriceService],
  controllers: [PriceController]
})
export class PriceModule {}
