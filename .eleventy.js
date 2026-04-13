function slugifyTag(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "blog/assets": "assets" });

  eleventyConfig.addCollection("publishedPosts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("blog/posts/*.md")
      .filter((item) => item.data.status === "published")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("tagGroups", function (collectionApi) {
    const posts = collectionApi
      .getFilteredByGlob("blog/posts/*.md")
      .filter((item) => item.data.status === "published")
      .sort((a, b) => b.date - a.date);

    const tagsByKey = new Map();

    for (const post of posts) {
      for (const tag of post.data.tags || []) {
        const label = String(tag || "").trim();

        if (!label) {
          continue;
        }

        const key = label.toLowerCase();

        if (!tagsByKey.has(key)) {
          tagsByKey.set(key, {
            tag: label,
            slug: slugifyTag(label),
            posts: []
          });
        }

        tagsByKey.get(key).posts.push(post);
      }
    }

    return Array.from(tagsByKey.values()).sort((a, b) =>
      a.tag.localeCompare(b.tag, "en", { sensitivity: "base" })
    );
  });

  eleventyConfig.addCollection("sitePages", function (collectionApi) {
    return collectionApi.getFilteredByGlob("blog/pages/*.md");
  });

  eleventyConfig.addFilter("readableDate", function (value) {
    if (!value) {
      return "";
    }

    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    });
  });

  eleventyConfig.addFilter("tagUrl", function (value) {
    return "/tags/" + slugifyTag(value) + "/";
  });

  return {
    dir: {
      input: "blog",
      includes: "_includes",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
