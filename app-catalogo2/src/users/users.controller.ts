import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, HttpCode, Headers, Redirect} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Headers('user-agent' ) userAgent: string,
    @Body('name') name: string,
    @Body('surname') surname: string,
    @Body('phone') phone: string,
  ) {
    console.log('User-Agent:', userAgent);
    const body = { name, surname, phone };
    return this.usersService.create(body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('search')
  search(@Query('q') q:string){
    console.log('Searching for:', q);
    return this.usersService.search(q);
  }

  @Get('5')
  @Redirect('/users/1', 301)
  findFive() {
    return this.usersService.findOne(5);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('old-search')
  oldSearch(
    @Query('q') q: string,
    @Res() res: any
  ) {
    return res.status(400).json({ message: 'This endpoint is deprecated. Please use /users/search?q=...' });
  }
}
