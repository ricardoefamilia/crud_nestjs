// src/common/common.module.ts
import { Module } from '@nestjs/common';
import {
  SERVER_NAME,
  ONLY_LOWERCASE_LETTERA_REGEX,
  REMOVE_SPACES_REGEX,
} from './constants/strings.constants';

@Module({
  providers: [
    {
      provide: SERVER_NAME,
      useValue: 'My Name Is NestJS',
    },
    {
      provide: ONLY_LOWERCASE_LETTERA_REGEX,
      useValue: 'My Name Is NestJS',
    },
    {
      provide: REMOVE_SPACES_REGEX,
      useValue: 'My Name Is NestJS',
    },
  ],
  exports: [SERVER_NAME, ONLY_LOWERCASE_LETTERA_REGEX, REMOVE_SPACES_REGEX],
})
export class CommonModule {}
