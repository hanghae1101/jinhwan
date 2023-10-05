import { Controller, Get, Query } from '@nestjs/common';
import { GetExpectedInfoService } from '../../application/get.expected.info.service';

@Controller('expected-info')
export class GetExpectedInfoHttpController {
  constructor(
    private readonly getExpectedInfoService: GetExpectedInfoService,
  ) {}
}
