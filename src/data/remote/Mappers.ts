import { Attachment, Board, CatalogPost, Cooldown, OriginalPost, ReplyPost } from "../../shared/types";
import { BoardDto, CooldownDto } from "./dto/BoardsDto";
import { CatalogPostDto } from "./dto/CatalogDto";
import { AttachmentDto, OriginalPostDto, ReplyPostDto } from "./dto/ThreadDto";

const thumbnailUrl = (board: string, tim: number) => `https://i.4cdn.org/${board}/${tim}s.jpg`;
const fileUrl = (board: string, tim: number, ext: string) => `https://i.4cdn.org/${board}/${tim}${ext}`;

export const attachmentFromDto = (attachmentDto: AttachmentDto, board: string): Attachment => {
    return Object.freeze({
        tim: attachmentDto.tim,
        filename: attachmentDto.filename,
        extention: attachmentDto.ext,
        filesize: attachmentDto.fsize,
        md5: attachmentDto.md5,
        width: attachmentDto.w,
        height: attachmentDto.h,
        thumbnailWidth: attachmentDto.tn_h,
        thumbnailHeight: attachmentDto.tn_w,
        filedeleted: Boolean(attachmentDto.filedeleted),
        spoiler: Boolean(attachmentDto.spoiler),
        customSpoiler: Boolean(attachmentDto.custom_spoiler),
        thumbnailUrl: thumbnailUrl(board, attachmentDto.tim),
        fileUrl: fileUrl(board, attachmentDto.tim, attachmentDto.ext),
    } as const);
};

export const replyPostFromDto = (replyPostDto: ReplyPostDto): ReplyPost => {
    const attachment = replyPostDto.tim
        ? attachmentFromDto({ ...replyPostDto } as AttachmentDto, replyPostDto.board)
        : {};


    return Object.freeze({
        board: replyPostDto.board,
        ...attachment,
        postId: replyPostDto.no,
        threadId: replyPostDto.resto,
        now: replyPostDto.now,
        time: replyPostDto.time,
        name: replyPostDto.name,
        trip: replyPostDto.trip,
        posterId: replyPostDto.id,
        capcode: replyPostDto.capcode,
        country: replyPostDto.country,
        countryName: replyPostDto.country_name,
        boardFlag: replyPostDto.board_flag,
        flagName: replyPostDto.flag_name,
        comment: replyPostDto.com,
        since4pass: replyPostDto.since4pass,
        mobileImage: Boolean(replyPostDto.m_img),
    } as const);
};

export const originalPostFromDto = (originalPostDto: OriginalPostDto): OriginalPost => {
    const replyPost = replyPostFromDto({ ...originalPostDto });

    return Object.freeze({
        ...replyPost,
        subject: originalPostDto.sub,
        sticky: Boolean(originalPostDto.sticky),
        closed: Boolean(originalPostDto.closed),
        replies: originalPostDto.replies,
        images: originalPostDto.images,
        bumplimit: Boolean(originalPostDto.bumplimit),
        imagelimit: Boolean(originalPostDto.imagelimit),
        tag: originalPostDto.tag,
        semanticUrl: originalPostDto.semantic_url,
        uniqueIps: originalPostDto.unique_ips,
        // tail_size?: number;
        archived: Boolean(originalPostDto.archived),
        archivedOn: originalPostDto.archived_on,
    } as const);
};

export const catalogPostFromDto = (catalogPostDto: CatalogPostDto): CatalogPost => {
    const originalPost = originalPostFromDto({ ...catalogPostDto });

    const obj = {
        ...originalPost,
        omittedPosts: catalogPostDto.omitted_posts,
        omittedImages: catalogPostDto.omitted_images,
        lastModified: catalogPostDto.last_modified,
        // lastReplies: catalogPostDto.last_replies,
    } as const

    // Remove undefined values
    return Object.freeze(Object.entries(obj).reduce((post, [key, value]) => {
        return value === undefined
            ? { ...post }
            : { ...post, [key]: value }
    }, {} as CatalogPost));
};

export const threadPostFromDto = (threadPostDto: OriginalPostDto | ReplyPostDto): OriginalPost | ReplyPost => {
    if (threadPostDto.resto === 0) {
        return originalPostFromDto(threadPostDto as OriginalPostDto);
    }
    return replyPostFromDto(threadPostDto as ReplyPostDto);
}

const cooldownFromDto = (cooldownDto: CooldownDto): Cooldown => {
    return Object.freeze({
        threads: cooldownDto.threads,
        replies: cooldownDto.replies,
        images: cooldownDto.images,
    } as const);
}

export const boardFromDto = (boardDto: BoardDto): Board => {
    const cooldowns = cooldownFromDto(boardDto.cooldowns);

    const optional = Object.entries({
        spoilers: Boolean(boardDto.spoilers),
        customSpoilers: boardDto.custom_spoilers,
        isArchived: Boolean(boardDto.is_archived),
        boardFlags: boardDto.board_flags,
        countryFlags: Boolean(boardDto.country_flags),
        userIds: Boolean(boardDto.user_ids),
        oekaki: Boolean(boardDto.oekaki),
        sjisTags: Boolean(boardDto.sjis_tags),
        codeTags: Boolean(boardDto.code_tags),
        mathTags: Boolean(boardDto.math_tags),
        textOnly: Boolean(boardDto.text_only),
        forcedAnon: Boolean(boardDto.forced_anon),
        webmAudio: Boolean(boardDto.webm_audio),
        requireSubject: Boolean(boardDto.require_subject),
        minImageWidth: boardDto.min_image_width,
        minImageHeight: boardDto.min_image_height,
    }).reduce((setting, [key, value]) => {
        return value
            ? { ...setting, [key]: value }
            : { ...setting }
    }, {});

    return Object.freeze({
        board: boardDto.board,
        title: boardDto.title,
        worksafeBoard: Boolean(boardDto.ws_board),
        threadsPerPage: boardDto.per_page,
        pages: boardDto.pages,
        maxFilesize: boardDto.max_filesize,
        maxWebmFilesize: boardDto.max_webm_filesize,
        maxCommentChars: boardDto.max_comment_chars,
        maxWebmDuration: boardDto.max_webm_duration,
        bumpLimit: boardDto.bump_limit,
        imageLimit: boardDto.image_limit,
        cooldowns: cooldowns,
        metaDescription: boardDto.meta_description,
        ...optional,
    } as const);
}