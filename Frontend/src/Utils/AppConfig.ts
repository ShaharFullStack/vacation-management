class AppConfig {
    private readonly baseUrl = process.env.REACT_APP_BASE_URL;

    constructor() {
        if (!this.baseUrl) {
            console.error("Base URL is not defined. Please check your .env file.");
            throw new Error("Base URL is missing");
        }
    }

    // General endpoints
    public readonly vacationsUrl = `${this.baseUrl}api/vacations`; // All vacations
    public readonly vacationById = `${this.baseUrl}api/vacations/`; // Single vacation
    public readonly searchVacationsUrl = `${this.baseUrl}api/vacations/search`; // Search vacations
    public readonly vacationsImagesUrl = `${this.baseUrl}api/vacations/images`; // Vacation images
    public readonly contactUsUrl = `${this.baseUrl}api/contact-us`; // Contact us endpoint

    // Likes endpoints
    public readonly likesUrl = `${this.baseUrl}api/likes`; // All likes
    public readonly likeVacationUrl = (vacationId: string) => `${this.baseUrl}api/vacations/${vacationId}/likes`; // Like endpoint
    public readonly vacationLikesCountUrl = (vacationId: string) => `${this.baseUrl}api/vacations/${vacationId}/likes/count`; // Vacation likes count
    public readonly userLikesUrl = `${this.baseUrl}api/users/likes`;

    // Authentication endpoints
    public readonly registerUrl = `${this.baseUrl}api/register`; // Register endpoint
    public readonly loginUrl = `${this.baseUrl}api/login`; // Login endpoint

    // Reports and contact endpoints
    public readonly reportsUrl = `${this.baseUrl}api/likes/report`; // Reports endpoint
    public readonly downloadCSVUrl = `${this.baseUrl}api/likes/report/csv`; // Download CSV report
}

export const appConfig = new AppConfig();
