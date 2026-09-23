import {
    Body,
    Controller,
    ForbiddenException,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PatientService } from './patient.service';
import { CreatePatientProfileDto } from './dto/create-patient-profile.dto';
import { UpdatePatientProfileDto } from './dto/update-patient-profile.dto';

@ApiTags('Patients')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('patients')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @Post('profile')
    @ApiOperation({ summary: 'Tworzenie profilu pacjenta (tylko dietetyk)'})
    createProfile(@Request() req, @Body() dto: CreatePatientProfileDto) {
        if (req.user.role !== 'DIETITIAN') {
            throw new ForbiddenException('Tylko dietetyk może tworzyć profil pacjenta');
        }
        return this.patientService.createProfile(req.user.id, dto);
    }

    @Get()
    @ApiOperation({ summary: 'Pobieranie listy pacjentów przypisanych do zalogowanego dietetyka' })
    findMyPatients(@Request() req) {
        if (req.user.role !== 'DIETITIAN') {
            throw new ForbiddenException('Tylko dietetyk ma dostęp do listy swoich pacjentów');
        }
        return this.patientService.findAllMyPatients(req.user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Pobieranie profilu pacjenta po ID' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.patientService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Aktualizacja profilu pacjenta po ID (tylko dietetyk)' })
    update(
        @Request() req,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdatePatientProfileDto,
    ) {
        if (req.user.role !== 'DIETITIAN') {
            throw new ForbiddenException('Tylko dietetyk może aktualizować profil pacjenta');
        }
        return this.patientService.update(id, dto);
    }
}
