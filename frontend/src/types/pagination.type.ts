import type { SpaceEntity } from "./source.interface";

export type Pagination = {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
    items: SpaceEntity[];
}