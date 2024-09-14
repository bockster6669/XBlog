import { Prisma } from '@prisma/client';

export type PostDTOProps = {
  search?: string;
  take?: number;
  orderBy?: Prisma.PostOrderByWithRelationInput;
};

export class PostDTO {
  private _search?: string;
  private _take?: number;
  private _orderBy?: Prisma.PostOrderByWithRelationInput;

  constructor({ search, take, orderBy }: PostDTOProps) {
    this._search = search;
    this._take = take;
    this._orderBy = orderBy;
  }

  public MapToPrisma(): Prisma.PostFindManyArgs {
    return {
      where: {
        title: {
          search: this._search,
        },
      },
      take: this._take,
      orderBy: this._orderBy,
    };
  }
}
