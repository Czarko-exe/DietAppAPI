import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DietPlanService } from './diet-plan.service';
import { CreateDietPlanDto } from './dto/create-diet-plan.dto';
import { AddMealDto } from './dto/add-meal.dto';
import { AddMealItemDto } from './dto/add-meal-item.dto';

@ApiTags('Diet Plans')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('diet-plans')
export class DietPlanController {
    constructor(private readonly dietPlanService: DietPlanService) {}

    @Post()
    @ApiOperation({ summary: 'Tworzenie nowego planu diety dla pacienta (tylko dietetyk)' })
    createPlan(@Request() req, @Body() dto: CreateDietPlanDto) {
        if (req.user.role !== 'DIETITIAN') {
            throw new ForbiddenException('Tylko dietetyk może tworzyć plany dietetyczne');
        }
        return this.dietPlanService.createPlan(req.user, dto);
    }

    @Post(':id/meals')
    @ApiOperation({ summary: 'Dodawanie posiłku do planu diety (tylko dietetyk)' })
    addMeal(
        @Request() req,
        @Param('id', ParseIntPipe) dietPlanId: number,
        @Body() dto: AddMealDto,
    ) {
        if (req.user.role !== 'DIETITIAN') {
            throw new ForbiddenException('Tylko dietetyk może dodawać posiłki');
        }
        return this.dietPlanService.addMeal(dietPlanId, dto);
    }

    @Post('meals/:mealId/items')
    @ApiOperation({ summary: 'Dodawanie produktu do posiłku (tylko dietetyk)' })
    addMealItem(
        @Request() req,
        @Param('mealId', ParseIntPipe) mealId: number,
        @Body() dto: AddMealItemDto,
    ) {
        if (req.user.role !== 'DIETITIAN') {
            throw new ForbiddenException('Tylko dietetyk może modyfikować skład posiłków')
        }
        return this.dietPlanService.addMealItem(mealId, dto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Pobieranie szczegółów planu diety wraz z posiłkami i podsumowaniem makro' })
    findPlanById(@Param('id', ParseIntPipe) id: number) {
        return this.dietPlanService.findPlanById(id);
    }

    @Get('patient/:patientProfileId')
    @ApiOperation({ summary: 'Pobieranie listy planów przypisanych do danego profilu pacjenta' })
    findPatientPlans(@Param('patientProfileId', ParseIntPipe) patientProfileId: number) {
        return this.dietPlanService.findPlanById(patientProfileId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Usuwanie planu diety (tylko dietetyk)' })
    remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
        if (req.user.role !== 'DIETITIAN') {
            throw new ForbiddenException('Tylko dietetyk może usunąć plany diet')
        }
        return this.dietPlanService.removePlan(id)
    }
}
