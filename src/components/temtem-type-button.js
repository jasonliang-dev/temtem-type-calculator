import React from "react"
import PropTypes from "prop-types"
import * as R from "ramda"

import { buttonVariant } from "../constants"
import styles from "./temtem-type-button.module.css"

const strHash = str => {
  let hash = 0

  if (str.length === 0) return hash

  /* eslint-disable no-bitwise */
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }

  return hash
}

const TemtemTypeButton = ({ name, image, onClick, variant }) => {
  const maskHash = Math.abs(strHash(name)) % 3
  const fgMask = ["fg-mask-1", "fg-mask-2", "fg-mask-3"][maskHash]
  const bgMask = ["bg-mask-1", "bg-mask-2", "bg-mask-3"][maskHash]

  return (
    <button className="relative w-32 mb-4 md:mx-1 font-bold" type="button" onClick={onClick}>
      <div
        className={`absolute z-0 inset-0 bg-tem-dark-gray hover:bg-tem-gray
          ${styles["button-mask"]}
          ${styles[bgMask]}
        `}
      />
      <div
        className={`relative z-10 flex items-center justify-center
          ${styles["button-mask"]}
          ${styles[fgMask]}
          ${R.cond([
            [
              R.equals(buttonVariant.DISABLED),
              () => "bg-tem-dark-blue text-gray-200 cursor-not-allowed",
            ],
            [R.equals(buttonVariant.SELECTED), () => "bg-tem-orange"],
            [R.T, () => "bg-tem-blue hover:bg-tem-light-blue"],
          ])(variant)}
        `}
      >
        {image && <img alt="" src={`/images/types/${image}`} />}
        <span className="ml-1 pr-2">{name}</span>
      </div>
    </button>
  )
}

TemtemTypeButton.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([
    buttonVariant.SELECTED,
    buttonVariant.DISABLED,
    null,
  ]),
}

TemtemTypeButton.defaultProps = {
  image: "",
  onClick: () => {},
  variant: null,
}

export default TemtemTypeButton
