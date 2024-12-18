// like-service.ts
import { v4 as uuid } from "uuid";
import { dal } from "../2-utils/dal";
import { LikeModel } from "../3-models/like-model";
import { BadRequestError, NotFoundError } from "../3-models/error-models";
import { appConfig } from "../2-utils/app-config";

class LikeService {
    public async addLike(userId: string, vacationId: string): Promise<LikeModel> {
        try {
            // Check if vacation exists
            const vacationExists = await this.checkVacationExists(vacationId);
            if (!vacationExists) {
                throw new NotFoundError("Vacation not found");
            }

            // Check if like already exists
            const existingLike = await this.getLike(userId, vacationId);
            if (existingLike) {
                // Return existing like instead of throwing an error
                return existingLike;
            }

            // Generate new UUID for the like
            const likeId = uuid();
            const now = new Date();

            // SQL query to insert like and update like count
            const sql = `
                INSERT INTO likes (id, userId, vacationId, likeDate) 
                VALUES (?, ?, ?, ?)
            `;

            // Execute query
            await dal.execute(sql, [likeId, userId, vacationId, now]);

            // Return the new like model
            return new LikeModel({
                id: likeId,
                userId,
                vacationId,
                likeDate: now
            });
        } catch (err) {
            if (err instanceof NotFoundError) throw err;
            throw new BadRequestError("Failed to add like: " + err.message);
        }
    }

    public async removeLike(userId: string, vacationId: string): Promise<void> {
        try {
            // Check if vacation exists
            const vacationExists = await this.checkVacationExists(vacationId);
            if (!vacationExists) {
                throw new NotFoundError("Vacation not found");
            }

            // Check if like exists before deleting
            const existingLike = await this.getLike(userId, vacationId);
            if (!existingLike) {
                throw new NotFoundError("Like not found");
            }

            const sql = `DELETE FROM likes WHERE userId = ? AND vacationId = ?`;
            const result = await dal.execute(sql, [userId, vacationId]);
        } catch (err) {
            if (err instanceof NotFoundError) throw err;
            throw new BadRequestError("Failed to remove like: " + err.message);
        }
    }

    public async getAllLikes(): Promise<LikeModel[]> {
        const sql = `
            SELECT 
                l.vacationId,
                l.likeDate,
                u.firstName,
                u.lastName,
                v.destination
            FROM likes l
            JOIN users u ON l.userId = u.id
            JOIN vacations v ON l.vacationId = v.vacationId
            ORDER BY l.likeDate DESC
        `;
        const result = await dal.execute(sql);
        return result.map(row => new LikeModel(row));
    }

    public async getLikesByVacation(vacationId: string): Promise<number> {
        const sql = `
            SELECT COUNT(*) as count 
            FROM likes 
            WHERE vacationId = ?
        `;
        const result = await dal.execute(sql, [vacationId]);
        return result[0].count;
    }

    public async getUserLikedVacations(userId: string): Promise<any[]> {
        const sql = `
            SELECT 
                v.*,
                l.likeDate,
                CONCAT('${appConfig.vacationImagesWebPath}', v.imageName) AS imageUrl
            FROM likes l
            JOIN vacations v ON l.vacationId = v.vacationId
            WHERE l.userId = ?
            ORDER BY l.likeDate DESC
        `;
        return await dal.execute(sql, [userId]);
    }

    private async getLike(userId: string, vacationId: string): Promise<LikeModel | null> {
        const sql = `
            SELECT * FROM likes 
            WHERE userId = ? AND vacationId = ?
        `;
        const result = await dal.execute(sql, [userId, vacationId]);
        return result.length > 0 ? new LikeModel(result[0]) : null;
    }

    private async checkVacationExists(vacationId: string): Promise<boolean> {
        const sql = `SELECT 1 FROM vacations WHERE vacationId = ?`;
        const result = await dal.execute(sql, [vacationId]);
        return result.length > 0;
    }
}

export const likeService = new LikeService();