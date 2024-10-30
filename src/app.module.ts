import {Module} from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { PriceModule } from './price/price.module'
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'postgres',
      password: 'anypassTest',
      database: 'TrackerDB',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    PriceModule
  ],
  controllers: [],
  providers: []
})


export class AppModule{}