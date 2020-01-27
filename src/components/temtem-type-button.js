import React from "react"
import PropTypes from "prop-types"

import { buttonVariant } from "../constants"

const TemtemTypeButton = ({ name, image, onClick, variant }) => {
  let additionalButtonStyles

  if (variant === buttonVariant.DISABLED) {
    additionalButtonStyles = "bg-gray-300 text-gray-700 cursor-not-allowed"
  } else if (variant === buttonVariant.SELECTED) {
    additionalButtonStyles = "bg-teal-200 hover:bg-teal-300 text-teal-900"
  } else {
    additionalButtonStyles = "bg-gray-100 hover:bg-gray-200 text-gray-900"
  }

  return (
    <button
      className={`mx-2 mb-4 px-2 shadow w-24 lg:w-32 h-12 rounded ${additionalButtonStyles}`}
      type="button"
      onClick={onClick}
    >
      <div className="flex items-center">
        {image && (
          <img
            className={`w-6 h-6 lg:w-8 lg:h-8 ${variant === "disabled" ? "opacity-50" : ""}`}
            alt=""
            src={`/images/types/${image}`}
          />
        )}
        <span className="flex-grow">{name}</span>
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
