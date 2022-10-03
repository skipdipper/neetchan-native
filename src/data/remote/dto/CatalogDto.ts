
import { OriginalPostDto } from "./ThreadDto";

export interface CatalogPageDto {
    page: number;
    threads: CatalogPostDto[];
}

export interface CatalogPostDto extends OriginalPostDto {
    omitted_posts: number;
    omitted_images: number;
    last_modified: number;
    // last_replies: ReplyPostDto[];
}