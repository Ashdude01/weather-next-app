import React from 'react'

const test = () => {
  return (
    <div>I M hero</div>
  )
}

export async function getServerSideProps(context) {
    console.log(context.query)
    return {
      props: {}, // will be passed to the page component as props
    }
  }
  
export default test
