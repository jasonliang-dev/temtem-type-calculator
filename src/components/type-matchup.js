import React from "react"
import * as R from "ramda"

const TypeMatchup = ({ dataEdges, selectedTypes }) => {
  const offensiveTypeMatchups = React.useMemo(
    () =>
      dataEdges.map(edge => {
        const calculateMultiplier = (arr, factor) =>
          arr.find(R.equals(selectedTypes.first)) ? factor : 1

        return {
          name: edge.node.name,
          image: edge.node.image,
          effectiveness:
            calculateMultiplier(edge.node.effective, 2) *
            calculateMultiplier(edge.node.ineffective, 0.5),
        }
      }, []),
    [dataEdges, selectedTypes.first]
  )

  const defensiveTypeMatchups = React.useMemo(() => {
    const typeData = dataEdges.reduce(
      (combinedTypeData, edge) =>
        R.any(R.equals(edge.node.name), [
          selectedTypes.first,
          selectedTypes.second,
        ])
          ? {
              effective: R.concat(
                combinedTypeData.effective,
                edge.node.effective
              ),
              ineffective: R.concat(
                combinedTypeData.ineffective,
                edge.node.ineffective
              ),
            }
          : combinedTypeData,
      { effective: [], ineffective: [] }
    )

    return dataEdges.map(edge => {
      const calculateMultiplier = (arr, factor) =>
        arr.reduce(
          (product, typeName) =>
            typeName === edge.node.name ? product * factor : product,
          1
        )

      return {
        name: edge.node.name,
        image: edge.node.image,
        effectiveness:
          calculateMultiplier(typeData.effective, 2) *
          calculateMultiplier(typeData.ineffective, 0.5),
      }
    }, [])
  }, [dataEdges, selectedTypes.first, selectedTypes.second])

  // console.log("offensiveTypeMatchups", offensiveTypeMatchups)
  // console.log("defensiveTypeMatchups", defensiveTypeMatchups)

  return [4, 2, 1, 0.5, 0.25].map(multiplier => {
    const filtered = defensiveTypeMatchups.filter(
      R.propEq("effectiveness", multiplier)
    )

    if (filtered.length === 0) {
      return null
    }

    return (
      <div key={multiplier} className="my-3">
        <h2 className="font-bold mb-1">Takes {multiplier}x Damage from</h2>
        {filtered.map(({ name }) => (
          <div key={name}>{name}</div>
        ))}
      </div>
    )
  })
}

export default TypeMatchup
