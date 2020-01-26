import React from "react"

import TemtemTypeButton from "./temtem-type-button"

const TemtemTypeSelector = ({
  dataEdges,
  selectedTypes,
  setSelectedTypes,
  damageDirection,
}) => {
  const secondaryTypeSelector = (
    <>
      <h2 className="font-bold text-xl my-2">Secondary Type</h2>
      <ul className="flex flex-wrap">
        {dataEdges.map(({ node }) => (
          <li key={node.name} className="inline">
            <TemtemTypeButton
              name={node.name}
              image={node.image}
              onClick={
                node.name === selectedTypes.first
                  ? () => {}
                  : () =>
                      setSelectedTypes(prev => ({
                        ...prev,
                        second: node.name,
                      }))
              }
              variant={(() => {
                if (node.name === selectedTypes.first) {
                  return "disabled"
                }

                if (node.name === selectedTypes.second) {
                  return "selected"
                }

                return null
              })()}
            />
          </li>
        ))}
        <li className="inline">
          <TemtemTypeButton
            name="None"
            onClick={() =>
              setSelectedTypes(prev => ({ ...prev, second: undefined }))
            }
            variant={selectedTypes.second ? null : "selected"}
          />
        </li>
      </ul>
    </>
  )

  return (
    <>
      <h2 className="font-bold text-xl mb-2">Primary Type</h2>
      <ul className="flex flex-wrap">
        {dataEdges.map(({ node }) => (
          <li key={node.name} className="inline">
            <TemtemTypeButton
              name={node.name}
              image={node.image}
              onClick={() =>
                setSelectedTypes(prev => ({
                  ...prev,
                  first: node.name,
                  second: prev.second === node.name ? undefined : prev.second,
                }))
              }
              variant={node.name === selectedTypes.first ? "selected" : null}
            />
          </li>
        ))}
      </ul>
      {damageDirection === "defence" ? secondaryTypeSelector : null}
    </>
  )
}

export default TemtemTypeSelector
