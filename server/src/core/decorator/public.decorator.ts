import { SetMetadata } from '@nestjs/common';

export const IS_PUCLIC_KEY = 'isPublic';

export const IsPublic = () => SetMetadata(IS_PUCLIC_KEY, true);
