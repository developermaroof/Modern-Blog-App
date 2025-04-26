import { gql, GraphQLClient } from "graphql-request";
import { NextResponse } from "next/server";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;

export async function POST(request) {
  const requestBody = await request.json();
  console.log("Request body:", requestBody);
  console.log(
    "GraphCMS Token:",
    graphcmsToken ? "Token exists" : "Token missing"
  );

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`,
    },
  });

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, requestBody);
    console.log("Comment created successfully:", result);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to submit comment" },
      { status: 500 }
    );
  }
}
