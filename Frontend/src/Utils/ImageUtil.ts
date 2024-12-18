class ImageUtil {

    public isImageFileType(fileName: string): boolean {

        if(!fileName) return false;

        const extensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", "tiff", "heif", "svg"];
        
        for (const extension of extensions)
            if (fileName.toLowerCase().endsWith(extension)) return true;
        
        return false;
    }

}

export const imageUtil = new ImageUtil();
