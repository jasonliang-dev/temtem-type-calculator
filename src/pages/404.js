import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const NotFoundPage = () => (
  <Layout location="*">
    <div className="h-screen max-w-4xl mx-auto flex flex-col justify-center items-center pb-48">
      <h1 className="text-6xl font-bold text-center">Page Not Found</h1>
      <Link className="text-xl border-b-2 border-gray-300 hover:border-gray-500" to="/">
        Go to Homepage
      </Link>
    </div>
  </Layout>
)

export default NotFoundPage
