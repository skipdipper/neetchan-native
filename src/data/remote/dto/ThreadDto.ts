export interface ThreadDto {
    posts: [OriginalPostDto, ...ReplyPostDto[]];
}

export interface AttachmentDto {
    tim: number;
    filename: string;
    ext: string;
    fsize: number;
    md5: string;
    w: number;
    h: number;
    tn_w: number;
    tn_h: number;
    filedeleted: 1;
    spoiler: 1;
    custom_spoiler: 1;
}

export interface ReplyPostDto extends Partial<AttachmentDto> {
    board: string; // manually defined from url
    no: number;
    resto: number;
    now: string;
    time: number;
    name: string;
    trip?: string;
    id?: string;
    capcode?: string;
    country?: string;
    country_name?: string;
    board_flag?: string;
    flag_name?: string;
    com?: string;
    since4pass?: number;
    m_img?: 1;
}

export interface OriginalPostDto extends ReplyPostDto {
    sub?: string;
    sticky?: 1;
    closed?: 1;
    replies: number;
    images: number;
    bumplimit?: 0 | 1;
    imagelimit?: 0 | 1;
    tag?: string;
    semantic_url: string;
    unique_ips: number; // omitted in catalog
    // tail_size?: number;
    archived?: 1;
    archived_on?: number;
}