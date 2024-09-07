'use server'

import { TagRepo } from '@/repository/tag.repo';

export async function getTags() {
  try {
    const tag = await TagRepo.findMany();
    return { tag };
  } catch (error) {
    return { error: 'Error accured while getting tags' };
  }
}
