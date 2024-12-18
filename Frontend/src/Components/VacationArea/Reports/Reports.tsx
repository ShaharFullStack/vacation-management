import axios from "axios";
import { useEffect, useState } from "react";
import { appConfig } from "../../../Utils/AppConfig";
import { notify } from "../../../Utils/Notify";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import "./Reports.css";

interface LikeReportItem {
    destination: string;
    likeCount: number;
}

export function Reports(): JSX.Element {
    const [reportData, setReportData] = useState<LikeReportItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                setLoading(true);

                const response = await axios.get<LikeReportItem[]>(appConfig.reportsUrl, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                });

                const sortedData = response.data.sort((a, b) => b.likeCount - a.likeCount);
                setReportData(sortedData);
            } catch (err: any) {
                const errorMessage = err.response?.data?.message || "Failed to fetch report data.";
                notify.error(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchReportData();
    }, []);

    const handleDownloadCSV = async () => {
        try {
            const response = await axios.get(`${appConfig.reportsUrl}/csv`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
                responseType: "blob",
            });

            const blob = new Blob([response.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "vacations_likes_report.csv");
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        } catch (err) {
            notify.error("Failed to download CSV file.");
        }
    };

    const renderContent = () => {
        if (loading) return <Spinner />;

        if (reportData.length === 0) {
            return (
                <div className="no-data">
                    <p>No likes data available yet.</p>
                </div>
            );
        }

        return (
            <table className="likes-report-table">
                <thead>
                    <tr>
                        <th>Vacation Destination</th>
                        <th>Likes Count</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((item, index) => (
                        <tr key={`${item.destination}-${index}`}>
                            <td>{item.destination || "Unknown"}</td>
                            <td>{item.likeCount || 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="ReportsPage">
            <h1>Likes Report</h1>
            <div className="report-container">{renderContent()}</div>
            <div className="button-container">
                <button onClick={handleDownloadCSV} className="download-csv-button">
                    Download CSV
                </button>
            </div>
        </div>
    );
}