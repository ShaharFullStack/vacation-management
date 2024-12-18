import { OkPacketParams } from "mysql2";
import { v4 as uuid } from "uuid";
import { fileSaver } from "uploaded-file-saver";
import { dal } from "../2-utils/dal";
import { NotFoundError } from "../3-models/error-models";
import { VacationModel } from "../3-models/vacation-model";
import { appConfig } from "../2-utils/app-config";

class VacationService {

    public async getAllVacations(): Promise<VacationModel[]> {
        const sql = `
            SELECT 
                vacationId, 
                destination, 
                description, 
                startDate, 
                endDate, 
                price, 
                CONCAT('${appConfig.vacationImagesWebPath}', imageName) AS imageUrl 
            FROM vacations
            ORDER BY startDate;
        `;
        const vacations = await dal.execute(sql);
        return vacations;
    }

    public async getOneVacation(vacationId: string): Promise<VacationModel> {
        const sql = `
            SELECT 
                vacationId, 
                destination, 
                description, 
                startDate, 
                endDate, 
                price, 
                CONCAT('${appConfig.vacationImagesWebPath}', imageName) AS imageUrl 
            FROM vacations 
            WHERE vacationId = ?;
        `;
        const values = [vacationId];
        const vacations = await dal.execute(sql, values);
        const vacation = vacations[0];
        if (!vacation) throw new NotFoundError(`Vacation with ID ${vacationId} not found.`);
        return vacation;
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        // Validate
        vacation.validateInsert();
        // Create UUID
        const vacationId = uuid();

        // Handle image if exists
        let imageName = null;
        if (vacation.image) {
            imageName = await fileSaver.add(vacation.image);
        }
        
        // Create SQL
        const sql = `
            INSERT INTO vacations(
                vacationId,
                destination,
                description,
                startDate,
                endDate,
                price,
                imageName
            ) VALUES(?, ?, ?, ?, ?, ?, ?);
        `;

        // Create values array
        const values = [
            vacationId,
            vacation.destination,
            vacation.description,
            vacation.startDate,
            vacation.endDate,
            vacation.price,
            imageName
        ];

        // Execute
        await dal.execute(sql, values);

        // Get the new vacation
        const dbVacation = await this.getOneVacation(vacationId);
        return dbVacation;
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        // Validate
        vacation.validateUpdate();
        // Get existing image name
        let imageName = await this.getImageName(vacation.vacationId);

        // Handle new image if exists
        if (vacation.image) {
            imageName = await fileSaver.update(imageName, vacation.image);
        }

        const sql = `
            UPDATE vacations SET
                destination = ?,
                description = ?,
                startDate = ?,
                endDate = ?,
                price = ?,
                imageName = ?
            WHERE vacationId = ?
        `;

        const values = [
            vacation.destination,
            vacation.description,
            vacation.startDate,
            vacation.endDate,
            vacation.price,
            imageName,
            vacation.vacationId
        ];

        const result: OkPacketParams = await dal.execute(sql, values);
        if (result.affectedRows === 0) {
            throw new NotFoundError(`Vacation with ID ${vacation.vacationId} not found.`);
        }

        const updatedVacation = await this.getOneVacation(vacation.vacationId);
        return updatedVacation;
    }

    public async deleteVacation(vacationId: string): Promise<void> {
        // Get image name for deletion
        const imageName = await this.getImageName(vacationId);

        const sql = `DELETE FROM vacations WHERE vacationId = ?;`;
        const result: OkPacketParams = await dal.execute(sql, [vacationId]);
        
        if (result.affectedRows === 0) {
            throw new NotFoundError(`Vacation with ID ${vacationId} not found.`);
        }

        // Delete image if exists
        if (imageName) {
            await fileSaver.delete(imageName);
        }
    }

    private async getImageName(vacationId: string): Promise<string> {
        const sql = `SELECT imageName FROM vacations WHERE vacationId = ?`;
        const result = await dal.execute(sql, [vacationId]);

        if (result.length === 0) {
            throw new NotFoundError(`Vacation with ID ${vacationId} not found.`);
        }

        return result[0].imageName;
    }

    public async getVacations(filter: string, userId?: string): Promise<VacationModel[]> {
        let query = "SELECT * FROM vacations";
        const params: any[] = [];
    
        switch (filter) {
            case "upcoming":
                query += " WHERE startDate > ?";
                params.push(new Date());
                break;
            case "active":
                query += " WHERE startDate <= ? AND endDate >= ?";
                params.push(new Date(), new Date());
                break;
            case "liked":
                if (!userId) throw new Error("User ID is required for liked vacations");
                query = `
                    SELECT v.* FROM vacations v
                    JOIN likes l ON v.vacationId = l.vacationId
                    WHERE l.userId = ?
                `;
                params.push(userId);
                break;
        }
    
        const [vacations] = await dal.execute(query, params);
        return vacations;
    }
    

    public async searchVacations(searchValue: string, page: number = 1, pageSize: number = 10): Promise<{ vacations: VacationModel[], total: number }> {
        const offset = (page - 1) * pageSize;

        const sql = `
            SELECT 
                vacationId, 
                destination, 
                description, 
                startDate, 
                endDate, 
                price,
                CONCAT('${appConfig.vacationImagesWebPath}', imageName) AS imageUrl
            FROM vacations
            WHERE destination LIKE CONCAT('%', ?, '%')
            ORDER BY startDate
            LIMIT ? OFFSET ?;
        `;

        const totalSql = `
            SELECT COUNT(*) AS count
            FROM vacations
            WHERE destination LIKE CONCAT('%', ?, '%');
        `;

        const [vacations, totalResult] = await Promise.all([
            dal.execute(sql, [searchValue, pageSize, offset]),
            dal.execute(totalSql, [searchValue])
        ]);

        const total = totalResult[0]?.count || 0;

        return { vacations, total };
    }
}

export const vacationService = new VacationService();