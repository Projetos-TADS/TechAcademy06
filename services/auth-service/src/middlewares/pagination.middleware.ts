import { NextFunction, Request, Response } from "express";

const ORDER_OPTIONS = ["asc", "desc"];

const pagination = (sortOptions: string[]) => {
  return (request: Request, response: Response, next: NextFunction): void => {
    const queryPage = Number(request.query.page);
    const queryPerPage = Number(request.query.perPage);
    const querySort = request.query.sort as string;
    const queryOrder = request.query.order as string;

    const page = queryPage > 1 ? queryPage : 1;
    const perPage = queryPerPage > 0 ? queryPerPage : 8;

    const baseUrl = `${request.protocol}://${request.get("host")}${request.baseUrl}${request.path}`;
    const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&perPage=${perPage}` : null;
    const nextPage = `${baseUrl}?page=${page + 1}&perPage=${perPage}`;

    const sort = sortOptions.includes(querySort) ? querySort : sortOptions[0];
    const order = ORDER_OPTIONS.includes(queryOrder) ? queryOrder : "asc";

    response.locals = {
      ...response.locals,
      pagination: {
        page: perPage * (page - 1),
        perPage,
        prevPage,
        nextPage,
        order,
        sort,
      },
    };

    return next();
  };
};

export default pagination;
