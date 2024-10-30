import { Controller, Get } from '@nestjs/common';
import { PriceService } from './price.service';

@Controller('prices')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  // Get hourly prices for the last 24 hours
  @Get('/hourly')
  async getHourlyPrices() {
    return this.priceService.getHourlyPrices();
  }
}
