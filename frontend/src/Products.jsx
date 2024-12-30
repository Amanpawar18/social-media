import React from 'react'

function Products({age, data}) {
  return (
    <div>
      Products data from props
      <br />
      age: {age}
      <br />
      data-age: {data.age}
      <br />
      data-a: {data.a}
    </div>
  )
}

export default Products
