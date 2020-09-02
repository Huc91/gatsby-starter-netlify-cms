import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

class BookRoll extends React.Component {
    render() {
        const { data } = this.props;
        const { edges: posts } = data.allMarkdownRemark;

        return (
            <div className="columns is-multiline">
                {posts &&
                    posts.map(({ node: post }) => (
                        <div className="is-parent column is-6" key={post.id}>
                            <article
                                className={`blog-list-item tile is-child box notification ${
                                    post.frontmatter.featuredpost
                                        ? "is-featured"
                                        : ""
                                }`}
                            >
                                <header>
                                    {post.frontmatter.featuredimage ? (
                                        <div className="featured-thumbnail">
                                            <PreviewCompatibleImage
                                                imageInfo={{
                                                    image:
                                                        post.frontmatter
                                                            .featuredimage,
                                                    alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                                                }}
                                            />
                                        </div>
                                    ) : null}
                                    <p className="post-meta">
                                        <Link
                                            className="title has-text-primary is-size-4"
                                            to={post.fields.slug}
                                        >
                                            {post.frontmatter.title}
                                        </Link>
                                        <br></br>
                                        <p>{`${post.frontmatter.price} Euro`}</p>
                                        <p>{post.frontmatter.available}</p>
                                    </p>
                                </header>
                                <p>
                                    {post.excerpt}
                                    <br />
                                    <br />
                                    <Link
                                        className="button"
                                        to={post.fields.slug}
                                    >
                                        Keep Reading →
                                    </Link>
                                </p>
                            </article>
                        </div>
                    ))}
            </div>
        );
    }
}

BookRoll.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
};

export default () => (
    <StaticQuery
        query={graphql`
            query BookRollQuery {
                allMarkdownRemark(
                    sort: { order: DESC, fields: [frontmatter___date] }
                    filter: {
                        frontmatter: { templateKey: { eq: "book-product" } }
                    }
                ) {
                    edges {
                        node {
                            excerpt(pruneLength: 400)
                            id
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                                templateKey
                                date(formatString: "MMMM DD, YYYY")
                                price
                                available
                                featuredpost
                                featuredimage {
                                    childImageSharp {
                                        fluid(maxWidth: 120, quality: 100) {
                                            ...GatsbyImageSharpFluid
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `}
        render={(data, count) => <BookRoll data={data} count={count} />}
    />
);
