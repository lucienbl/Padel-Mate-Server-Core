import { BadRequestException } from '@nestjs/common';

export default function assert(assertion: any, message?: string) {
  if (!assertion) {
    throw new BadRequestException(message || 'Assertion failed');
  }
}
