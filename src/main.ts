import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Moralis from 'moralis';
async function bootstrap() {
  
  await Moralis.start({
    apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImNmNmQ4NGZlLTdmMDctNDBkZi05MThlLTliM2Y3ZWRmZTBmNCIsIm9yZ0lkIjoiNDEzOTY4IiwidXNlcklkIjoiNDI1NDM2IiwidHlwZUlkIjoiMGU5MjcyNGMtNjIyZC00ZjY5LWFjZDEtNDgxYWFhNmQyOGMyIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MzAzMTcxODYsImV4cCI6NDg4NjA3NzE4Nn0.JwkpgKiV0gMhWUyXLjEX4Arjiu16Ysw4lBzOjta7dLs', // Replace with your Moralis API key
  });

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
