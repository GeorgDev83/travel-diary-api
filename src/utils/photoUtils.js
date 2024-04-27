import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv/config';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

import generateErrorsUtils from './generateErrorsUtils.js';

const {UPLOAD_DIR} = process.env;

export const savePhotoUtils = async (img, width) => {
    try {
        const uploadDir = path.join(process.cwd(), `./src/${UPLOAD_DIR}`);

        /**
         * Si no existe la carpeta upload, la creamos, si no accedemos
         */
        try{
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir);
        }

        /***
         * Crear un objeto del tipo sharp
         */
        const sharpImg = sharp(img.data);

        sharpImg.resize(width);

        const imgName = `${uuidv4()}.jpg`;

        const pathImg = path.join(uploadDir, imgName);

        /**
         * guardando la imagen en el disco del servidor
         */
        await sharpImg.toFile(pathImg); 

        return imgName;        
    }catch(error) {
        throw generateErrorsUtils('Error al guardar la imagen!', 500);
    }
} 

export const deletePhotoUtils = async (imgName) => {
    try {
        const imgPath = path.join(process.cwd(), `./src/${UPLOAD_DIR}`, imgName);

        try {
            await fs.access(imgPath);
        }catch {
            return;
        }

        await fs.unlink(imgPath);
    } catch(error) {
        throw generateErrorsUtils('Error al intentar eliminar archivo!', 500);
    }    
}