import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @ApiOperation({ summary: 'Pobieranie listy produktów' })
    @ApiQuery({ name: 'search', required: false, description: 'Wyszukiwanie produktów po nazwie'})
    findAll(@Query('search') search?: string) {
        return this.productService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Pobieranie produktu po ID' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Post()
    @ApiOperation({ summary: 'Dodawanie nowego produktu (tylko dietetyk)' })
    create(@Request() req, @Body() dto: CreateProductDto) {
        if (req.user.role !== 'DIETITIAN') {
            throw new ForbiddenException('Tylko dietetyk może dodawać produkty');
        }
        return this.productService.create(dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Patch(':id')
    @ApiOperation({ summary: 'Aktualizacja produktu (tylko dietetyk)' })
    update(@Request() req, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
        if (req.user.role !== 'DIETITIAN') {
            throw new ForbiddenException('Tylko dietetyk może aktualizować produkty');
        }
        return this.productService.update(id, dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ summary: 'Usuwanie produktu (tylko dietetyk)' })
    remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
        if (req.user.role !== 'DIETITIAN') {
            throw new ForbiddenException('Tylko dietetyk może usuwać produkty');
        }
        return this.productService.remove(id);
    }
}

