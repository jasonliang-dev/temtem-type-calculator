import React from "react"
import "./src/styles/global.css"

import { GlobalStateProvider } from "./src/context/GlobalStateContext"

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = ({ element }) => (
  <GlobalStateProvider>{element}</GlobalStateProvider>
)
