import React from "react"
import PropTypes from "prop-types"

import styles from "./attack-direction-button.module.css"

const AttackDirectionButton = ({ onClick, children, mask, variant }) => {
  return (
    <button className="relative mx-3 mb-4 font-bold" type="button" onClick={onClick}>
      <div
        className={`relative z-10 flex items-center justify-center bg-tem-dark-gray hover:bg-tem-gray text-gray-100
          ${styles[mask]}
        `}
      >
        {children}
      </div>
      <div
        className={`absolute z-0 inset-0 ${styles.scaled}
          ${styles[mask]}
          ${variant === "selected" ? `bg-tem-blue` : "bg-black opacity-25"}
        `}
      />
    </button>
  )
}

AttackDirectionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  mask: PropTypes.oneOf(["button-mask-1", "button-mask-2"]).isRequired,
  variant: PropTypes.oneOf(["selected", "", undefined])
}

AttackDirectionButton.defaultProps = {
  children: null,
  variant: undefined
}

export default AttackDirectionButton
