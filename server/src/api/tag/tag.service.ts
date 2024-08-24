import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  constructor() {}
  findAll() {
    const tags = Array.from({ length: 10 }).map((v, i) => ({
      id: i,
      name: `tag-${i}`,
      displayName: `tag ${i}`,
    }));
    return tags;
  }
}
