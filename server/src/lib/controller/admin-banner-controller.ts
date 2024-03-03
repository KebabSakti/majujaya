import { Request, Response } from "express";
import Joi from "joi";
import { BadRequest, Failure } from "../helper/failure";
import AdminBannerRepository from "../repository/admin-banner-repository";
import { upload } from "../helper/common";

const adminBannerRepository = new AdminBannerRepository();

export default class AdminBannerController {
  async index(req: Request, res: Response) {
    try {
      const result = await adminBannerRepository.index();

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }

  async create(req: Request, res: Response) {
    upload(req, res, async (uploadErr) => {
      try {
        if (uploadErr) {
          throw new BadRequest(uploadErr.message);
        }

        const schema = Joi.object({
          name: Joi.string().required(),
        }).unknown();

        const { error } = schema.validate(req.body);

        if (error) {
          throw new BadRequest(error.message);
        }

        if (req.files?.length == 0) {
          throw new BadRequest("Gambar tidak boleh kosong");
        }

        const fileUrl = `${req.protocol}://${req.headers.host}/image/${
          (req.files as any)[0].filename
        }`;

        const result = await adminBannerRepository.create({
          ...req.body,
          picture: fileUrl,
        });

        res.json(result);
      } catch (error: any) {
        Failure.handle(error, res);
      }
    });
  }

  async update(req: Request, res: Response) {
    try {
      const param = {
        ...req.body,
        id: req.params.id,
      };

      const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        picture: Joi.string().required(),
      }).unknown();

      const { error } = schema.validate(param);

      if (error) {
        throw new BadRequest(error.message);
      }

      const result = await adminBannerRepository.update(req.body);

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const result = await adminBannerRepository.delete({ id: req.params.id });

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
