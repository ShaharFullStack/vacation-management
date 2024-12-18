import { dal } from "../2-utils/dal";

class LikeReportService {
    public async generateGlobalLikesReport(): Promise<any[]> {
        const sql = `
            SELECT 
                v.destination,
                COUNT(l.id) AS likeCount
            FROM vacations v
            LEFT JOIN likes l ON v.vacationId = l.vacationId
            GROUP BY v.vacationId, v.destination
            ORDER BY likeCount DESC
        `;

        const result = await dal.execute(sql);
        return result.map(row => ({
            destination: row.destination,
            destinationLong: row.destination || "",
            likeCount: row.likeCount || 0,
        }));
    }

    public async generateLikesCSV(): Promise<string> {
        const reportData = await this.generateGlobalLikesReport();
        const csvData = reportData.map(row => `"${row.destination}",${row.likeCount}`).join("\n");
        return `Destination,Likes\n${csvData}`;
    }

}

export const likeReportService = new LikeReportService();
