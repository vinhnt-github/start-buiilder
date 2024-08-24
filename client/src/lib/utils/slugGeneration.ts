function generateSlug(title: string) {
  return title
    .toLowerCase() // Convert the title to lowercase
    .trim() // Remove whitespace from both ends
    .replace(/[^a-z0-9\s-]/g, "") // Remove all non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace multiple spaces with a single hyphen
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
}
