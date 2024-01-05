import React from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" class="form-control" onChange={(e)=>{setValue(e.target.value)}} placeholder="Enter the new Category" value={value} style={{ border: 'solid black 1px' }} />
                </div>
                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                </div></form>
        </div>
    )
}

export default CategoryForm;