import React from "react"
import { GiBroadsword, GiBorderedShield } from "react-icons/gi"

import { attackDirection as attackDirectionEnum } from "../constants"

const AttackDirectionButton = ({
  attackDirection,
  variant,
  onClick,
  additionalClasses,
}) => {
  const baseClasses =
    "p-2 px-4 text-xl font-bold md:w-64 flex items-center justify-center"
  const selectedClasses =
    attackDirection === variant
      ? "text-gray-100 bg-teal-700 hover:bg-teal-800"
      : "bg-gray-100 hover:bg-gray-200"

  return (
    <button
      type="button"
      className={`${baseClasses} ${selectedClasses} ${additionalClasses}`}
      onClick={onClick}
    >
      {variant === attackDirectionEnum.OFFENCE ? (
        <>
          <div className="mr-4">
            <GiBroadsword />
          </div>
          Offence
        </>
      ) : (
        <>
          <div className="mr-4">
            <GiBorderedShield />
          </div>
          Defence
        </>
      )}
    </button>
  )
}

export default AttackDirectionButton
