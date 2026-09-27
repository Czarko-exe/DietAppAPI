import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { PatientModule } from './patient/patient.module';
import { DietPlanModule } from './diet-plan/diet-plan.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, ProductModule, PatientModule, DietPlanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
