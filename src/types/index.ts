export interface Story {
    id: string
    content: string
    parent_id: string | null
    author_geo: string | null
    created_at: string
    is_hidden: boolean
}
