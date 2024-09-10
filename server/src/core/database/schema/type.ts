import { z } from 'zod';
import { FlagEnum, PostStatusEnum, PostTypeEnum } from './enum';

export const FlagSchema = z.enum(FlagEnum.enumValues);
export const PostStatus = z.enum(PostStatusEnum.enumValues);
export const PostType = z.enum(PostTypeEnum.enumValues);
