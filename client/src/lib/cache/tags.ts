export const tagCache = {
  getAllTags: () => ["all-tags"],
  getAllPosts: () => ["all-posts"],
  getTagDetailByName: (tagName: string) => [`tag-${tagName}-detail`],
  getPostDetail: (slug: string) => [`post-${slug}-detail`],
};
