module.exports = {
  siteMetadata: {
    title: `Temtem Type Calculator`,
    description: ``,
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
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
    `gatsby-plugin-postcss`,
    // purgecss must be after postcss
    // {
    //   resolve: `gatsby-plugin-purgecss`,
    //   options: {
    //     tailwind: true, // Enable tailwindcss support
    //   }
    // }
  ],
}
