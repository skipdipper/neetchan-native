// Contains interface for domain objects corresponding to Thread and Catalog DTO

export interface Thread {
    page: number;
    posts: [OriginalPost, ...ReplyPost[]];
}

export interface Attachment {
    tim?: number;
    filename?: string;
    extention?: string;
    filesize?: number;
    md5?: string;
    width?: number;
    height?: number;
    thumbnailWidth?: number;
    thumbnailHeight?: number;
    filedeleted?: boolean;
    spoiler?: boolean;
    customSpoiler?: boolean;
}

export interface ReplyPost extends Attachment {
    postId: number;
    threadId: number;
    now: string;
    time: string;
    name: string;
    trip?: string;
    posterId?: string;
    capcode?: string;
    country?: string;
    countryName?: string;
    boardFlag?: string;
    flagName?: string;
    comment?: string;
    since4pass?: number;
    mobileImage?: boolean;
}

export interface OriginalPost extends ReplyPost {
    subject?: string;
    sticky?: boolean;
    closed?: boolean;
    replies: number;
    images: number;
    bumplimit?: boolean;
    imagelimit?: boolean;
    tag?: string;
    semanticUrl: string;
    uniqueIps: number;
    // tail_size?: number;
    archived?: boolean;
    archivedOn?: number;
}

export interface CatalogPost extends Omit<OriginalPost, 'uniqueIps'> {
    omittedPosts: number;
    omittedImages: number;
    lastModified: number;
    // lastReplies: ReplyPost[];
}


export interface CatalogPage extends CatalogPost {
    page: number;
    threads: CatalogPost[];
}

export interface Catalog extends CatalogPost {
    data: CatalogPage[];
}