import { Attachment, CatalogPost, OriginalPost, ReplyPost } from "../../shared/types";
import { CatalogPostDto } from "./dto/CatalogDto";
import { AttachmentDto, OriginalPostDto, ReplyPostDto } from "./dto/ThreadDto";


export const attachmentFromDto = (attachmentDto: AttachmentDto): Attachment => {
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
    } as const);
};

export const replyPostFromDto = (replyPostDto: ReplyPostDto): ReplyPost => {
    const attachment = attachmentFromDto({ ...replyPostDto });

    return Object.freeze({
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