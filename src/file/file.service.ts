import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

export enum FileType{
    IMAGE = 'image',
}

@Injectable()
export class FileService {
  createImage(type :FileType, file: any): string {
    try {
      const extension: string = file.originalname.split(".").pop();
      const fileName = uuidv4() + "." + extension;
      const filePath = path.resolve(
        __dirname,
        "..",
        "..",
        "static",
        "uploads",
        type
      );

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);

      return fileName;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeImage(type : FileType,fileName: string | null) {
    try {
        const filePath = path.resolve(
            __dirname,
            "..",
            "..",
            "static",
            "uploads",
            type
          );

          if (fs.existsSync(filePath) && fileName) {
            fs.unlinkSync(path.resolve(filePath, fileName))
          }

          return '';
    } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
