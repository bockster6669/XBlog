import { Prisma } from '@prisma/client';

export type PostDTOProps = {
  search?: string;
  take?: number;
  orderBy?: Prisma.PostOrderByWithRelationInput;
};
export class PostDTO {
  public static MapToPrisma({
    search,
    take,
    orderBy,
  }: PostDTOProps): Prisma.PostFindManyArgs {
    return {
      where: {
        title: {
          search,
        },
      },
      take,
      orderBy,
    };
  }

  public static toQueryString({ search, take, orderBy }: PostDTOProps): string {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (take) params.append('take', take.toString());
    if (orderBy) params.append('orderBy', JSON.stringify(orderBy));

    return params.toString();
  }

  public static fromSearchParams(params: URLSearchParams): PostDTOProps {
    const search = params.get('search') || undefined;
    const take = params.get('take')
      ? parseInt(params.get('take') as string, 10)
      : undefined;
    const orderByStr = params.get('orderBy');

    let orderBy: Prisma.PostOrderByWithRelationInput | undefined = undefined;

    if (orderByStr) {
      orderBy = JSON.parse(orderByStr);
    }

    return {
      search,
      take,
      orderBy,
    };
  }
}
