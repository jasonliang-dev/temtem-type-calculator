import React from "react"
import PropTypes from "prop-types"

const TemtemTypeButton = ({ name, image, onClick, variant }) => {
  let additionalButtonStyles

  if (variant === "disabled") {
    additionalButtonStyles = "bg-gray-300 text-gray-700 cursor-not-allowed"
  } else if (variant === "selected") {
    additionalButtonStyles = "bg-teal-200 hover:bg-teal-300 text-teal-900"
  } else {
    additionalButtonStyles = "bg-gray-100 hover:bg-gray-200 text-gray-900"
  }

  return (
    <button
      className={`mr-3 mb-4 p-2 shadow w-32 h-12 rounded ${additionalButtonStyles}`}
      type="button"
      onClick={onClick}
    >
      <div className="flex items-center">
        {image && (
          <img
            className={`inline ${variant === "disabled" ? "opacity-50 " : ""}`}
            alt=""
            // eslint-disable-next-line global-require, import/no-dynamic-require
            src={require(`../images/${image}`)}
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
  variant: PropTypes.oneOf(["selected", "disabled", null]),
}

TemtemTypeButton.defaultProps = {
  image: "",
  onClick: () => {},
  variant: null,
}

export default TemtemTypeButton
