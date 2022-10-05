// Interfaces for domain objects corresponding to Thread, Catalog and Board DTO

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

export interface Board {
    board: string;
    title: string;
    worksafeBoard: boolean;
    threadsPerPage: number;
    pages: number;
    maxFilesize: number;
    maxWebmFilesize: number;
    maxCommentChars: number;
    maxWebmDuration: number;
    bumpLimit: number;
    imageLimit: number;
    cooldowns: Cooldown;
    metaDescription: string;
    spoilers?: boolean;
    customSpoilers?: number;
    isArchived?: boolean;
    boardFlags?: BoardFlagDictionary;
    countryFlags?: boolean;
    userIds?: boolean;
    oekaki?: boolean;
    sjisTags?: boolean;
    codeTags?: boolean;
    mathTags?: boolean;
    textOnly?: boolean;
    forcedAnon?: boolean;
    webmAudio?: boolean;
    requireSubject?: boolean;
    minImageWidth?: number;
    minImageHeight?: number;
}

export interface Cooldown {
    threads: number;
    replies: number;
    images: number;
}

export interface BoardFlagDictionary {
    [index: string]: string;
}