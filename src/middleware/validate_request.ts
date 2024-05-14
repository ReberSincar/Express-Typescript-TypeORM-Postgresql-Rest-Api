import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

const validateRequest = async (
  model: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dto = plainToClass(model, req.body);
  const errors = await validate(dto, {
    skipMissingProperties: true,
    forbidNonWhitelisted: true,
  });

  if (errors.length > 0) {
    const response = errors.map((e) => {
      return {
        field: e.property,
        value: e.value,
        messages: Object.values(e.constraints),
      };
    });
    return res.status(400).send(response);
  }

  next();
};

export default validateRequest;
