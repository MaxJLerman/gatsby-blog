import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import "./index.css";

export default ({ data }) => {
	console.log(data);
	return (
		<Layout>
			<div>
				<h1>Max's Thoughts</h1>
				<h4>{data.allMarkdownRemark.totalCount}</h4>
				{
					data.allMarkdownRemark.edges.map(({ node }) => (
						<div key={node.id}>
							<Link className="blogLink" to={node.fields.slug}>
								<h3 className="blogTitle">{node.frontmatter.title} - {node.frontmatter.date}</h3>
								<p>{node.excerpt}</p>
							</Link>
						</div>
					))
				}
			</div>
		</Layout>
	);
};

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export const query = graphql`
  query {
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			totalCount 
			edges {
				node {
					id
					frontmatter {
						description
						title
						date
					}
					fields {
						slug
					}
					html
					excerpt
				}
			}
		}
	}
`;
