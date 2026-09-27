import { Module } from '@nestjs/common';
import { DietPlanService } from './diet-plan.service';
import { DietPlanController } from './diet-plan.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DietPlanController],
  providers: [DietPlanService],
  exports: [DietPlanService],
})
export class DietPlanModule {}