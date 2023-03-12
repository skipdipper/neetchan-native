export interface BoardArrayDto {
  boards: BoardDto[];
}

export interface BoardDto {
  board: string;
  title: string;
  ws_board: 0 | 1;
  per_page: number;
  pages: number;
  max_filesize: number;
  max_webm_filesize: number;
  max_comment_chars: number;
  max_webm_duration: number;
  bump_limit: number;
  image_limit: number;
  cooldowns: CooldownDto;
  meta_description: string;
  spoilers?: 0 | 1;
  custom_spoilers?: number;
  is_archived?: 0 | 1;
  board_flags?: BoardFlagDictionaryDto;
  country_flags?: 0 | 1;
  user_ids?: 0 | 1;
  oekaki?: 0 | 1;
  sjis_tags?: 0 | 1;
  code_tags?: 0 | 1;
  math_tags?: 0 | 1;
  text_only?: 0 | 1;
  forced_anon?: 0 | 1;
  webm_audio?: 0 | 1;
  require_subject?: 0 | 1;
  min_image_width?: number;
  min_image_height?: number;
}

export interface CooldownDto {
  threads: number;
  replies: number;
  images: number;
}

export interface BoardFlagDictionaryDto {
  [index: string]: string;
}
