const BASE64_MARKER = ';base64,';

export const stripDataURI = (dataURI) => {
    const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    return dataURI.substring(base64Index);
};
export const imageBytes = (url: string, name?: string): Promise<{ path: string, data: string, width: number, height: number }> => {
    return new Promise((resolve, rej) => {
        let img = new Image();
        img.onload = () => {
            let canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            let dataURL = canvas.toDataURL("image/jpeg");
            resolve({
                path: name || url,
                data: stripDataURI(dataURL),
                width: img.width,
                height: img.height
            });
        };
        img.onerror = () => rej({
            path: name || url,
            status: 'error'
        });
        img.src = url;
    });
};
