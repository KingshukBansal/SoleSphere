import React from 'react'

const BrandForm = ({handleSubmit,value,setValue}) => {

    return (
      
            <form onSubmit={handleSubmit} className='w-full flex flex-row'>
                <div className="mb-3 w-full">
                    <input type="text" class="rounded-xl p-3 outline-blue-700 w-full" onChange={(e)=>{setValue(e.target.value)}} placeholder="Enter the new brand" value={value} style={{ border: 'solid black 1px' }} />
                </div>
                <div className="flex justify-end mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-md px-8">Add</button>
                </div></form>
 
    )
}

export default BrandForm;