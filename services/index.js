import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            category {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      posts(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        category {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.posts[0];
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.posts;
};

// Fixed version of getSimilarPosts with category_some instead of categories_some
export const getSimilarPosts = async (category, slug) => {
  // First try with category_some
  const query = gql`
    query GetPostDetails($slug: String!, $category: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { category_some: { slug_in: $category } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query, { slug, category });
    return result.posts;
  } catch (error) {
    console.error("Error in getSimilarPosts:", error);

    // Fallback to a simpler query that doesn't filter by category
    const fallbackQuery = gql`
      query GetFallbackPosts($slug: String!) {
        posts(where: { slug_not: $slug }, last: 3) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;

    try {
      const fallbackResult = await request(graphqlAPI, fallbackQuery, { slug });
      return fallbackResult.posts;
    } catch (fallbackError) {
      console.error("Fallback query also failed:", fallbackError);
      return []; // Return empty array as a last resort
    }
  }
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.categories;
};

export const submitComment = async (obj) => {
  try {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
};
