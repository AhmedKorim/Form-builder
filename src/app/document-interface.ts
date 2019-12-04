export interface PdfDocument {
    title: string,
    template: {
        top?: number,
        left?: number,
        right?: number,
        bottom?: number,
    },
    contents: DocumentObject[],
    stationary?: DocumentObject[],
    image_data?: {
        [key: string]: string
    },
    image_widths?: image_dimantins_map,
    image_heights?: image_dimantins_map,
}

interface image_dimantins_map {
    [key: string]: number
}

type DocumentObjectTypes = "Paragraph" |
    "Image" |
    "Spacer" |
    "Table" |
    "Cell" |
    "Row" |
    "PageNumber" |
    "Path";
type DocumentAlignment = "center" | "left" | "right";

export interface DocumentObject {
    obj_type: DocumentObjectTypes;
    params: {
        text?: string,
        font_size?: number,
        font_name?: string
        color?: number[],
        x?: number,
        y?: number,
        bullet_indent?: number,
        align: DocumentAlignment,
        src?: string,
        fit_width?: boolean,
        padding?: {
            top?: number,
            left?: number,
            right?: number,
            bottom?: number,
        },
    }
}
