import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalFileRepository } from "./localfileRepository";
import { QueryRunner } from 'typeorm';
import LocalFile from "../local-file/entity/localFile.entity"


@Injectable()
export class LocalFilesService {
    constructor(
        @InjectRepository(LocalFileRepository)
        private LocalFileRepository: LocalFileRepository
    ) { }
    async uploadDatabaseFile(dataBuffer: Buffer, filename: string) {
        const newFile = await this.LocalFileRepository.create({
            filename,
            data: dataBuffer
        })
        await this.LocalFileRepository.save(newFile);
        return newFile;
    }

    async getFileById(fileId: number) {
        const file = await this.LocalFileRepository.findOne(fileId);
        if (!file) {
            throw new NotFoundException();
        }
        return file;
    }
    async uploadDatabaseFileWithQueryRunner(dataBuffer: Buffer, filename: string, queryRunner: QueryRunner) {
        const newFile = await queryRunner.manager.create(LocalFile, {
            filename,
            data: dataBuffer
        })
        await queryRunner.manager.save(LocalFile, newFile);
        return newFile;
    }

    async deleteFileWithQueryRunner(fileId: number, queryRunner: QueryRunner) {
        const deleteResponse = await queryRunner.manager.delete(LocalFile, fileId);
        if (!deleteResponse.affected) {
            throw new NotFoundException();
        }
    }
}
