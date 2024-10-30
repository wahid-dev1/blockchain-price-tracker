import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './price.entity'
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';

import Moralis from 'moralis';
import {EvmChain} from '@moralisweb3/common-evm-utils'
import { MoreThanOrEqual } from 'typeorm';

@Injectable()
export class PriceService {
    constructor(@InjectRepository(Price)
    private priceRepository: Repository<Price>) {

    }
   
    @Cron('*/6 * * * * *')
    async fetchPrices() {
        
        // Fetch Polygon price
        const ETHEREUMPrice = await this.getNativeTokenPrice("ETHEREUM"); // 0x89 for Polygon Mainnet
    
        await this.savePrice('ETHEREUM', ETHEREUMPrice);
    
        console.log('Prices fetched and saved.');
      }
    
      // Get price of native tokens using Moralis API
      private async getNativeTokenPrice(chainId: string): Promise<number> {
        try {
          
          const response = await Moralis.EvmApi.token.getTokenPrice({
            address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
            chain: EvmChain.ETHEREUM
          });
          console.log(response.result.usdPrice)
          // Extract the USD price from the response
          const usdPrice = response.result.usdPrice;
          return usdPrice;
        } catch (error) {
          console.error(`Error fetching native token price for chain ${chainId}:`, error);
          return 0;
        }
      }
    
      // Save the price to the database
      private async savePrice(chain: string, price: number) {
        const priceRecord = this.priceRepository.create({ chain, price });
        await this.priceRepository.save(priceRecord);
      }
    
    async getHourlyPrices() {
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        return await this.priceRepository.find({
            where: { createdAt: MoreThanOrEqual(oneDayAgo) }, // Use MoreThanOrEqual operator
            order: { createdAt: 'ASC' },
        });
    }
}
