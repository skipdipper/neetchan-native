export interface CatalogPage {
    page: number,
    threads: Array<OriginalPost>,
}

export interface OriginalPost {
    no: number,
    now: string,
    name: string,
    subject?: string,
    comment?: string,
    filename?: string,
    ext?: string,
    width?: number,
    height?: number,
    tnWidth?: number,
    tnHeight?: number,
    tim: number,
    time: string,
    filesize?: number,
    resto: number,
    replies: number,
    images: number,
}

// TODO: implement user-defined type guard for runtime/dynamic interface type checking
// alternatively JSON Schema with Ajv
// https://www.npmjs.com/package/ts-type-checked
// https://2ality.com/2020/06/validating-data-typescript.html
// https://bobbyhadz.com/blog/typescript-check-if-object-implements-interface
export const Catalog = (json: any) => {
    const fromJson = (): OriginalPost => {
        return {
            no: json['no'],
            now: json['now'],
            name: json['name'],
            subject: json['sub'],
            comment: json['com'],
            filename: json['filename'],
            ext: json['com'],
            width: json['w'],
            height: json['h'],
            tnWidth: json['tn_w'],
            tnHeight: json['tn_h'],
            tim: json['tim'],
            time: json['time'],
            filesize: json['fsize'],
            resto: json['resto'],
            replies: json['replies'],
            images: json['images'],
        }
    }
    return { fromJson };
};
