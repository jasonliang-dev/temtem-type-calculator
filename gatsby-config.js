module.exports = {
  siteMetadata: {
    title: `Temtem Type Calculator`,
    description: `A web app that shows the effectiveness and ineffectiveness between different Temtem types.`,
    author: `Jason Liang`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "data",
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Temtem Type Calculator`,
        short_name: `Temtem Type Calculator`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#28282A`,
        display: `minimal-ui`,
        icon: `src/images/neutral-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-156434015-2",
        head: true, // `true` in head and `false` in body
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },
      },
    },
    // purgecss must be after postcss
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true, // Enable tailwindcss support
      }
    },
  ],
}
