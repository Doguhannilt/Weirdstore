
const CategoryForm = ({value, setValue, handleSubmit, buttonText = 'Submit', handleDelete}) => {
  return (
      <div>
          <form
              onSubmit={handleSubmit}
              className="space-y-3">
              <input
                  type="text"
                  className="py-3 px-4 border rounded-lg w-full"
                  placeholder="Provide Category Name"
                  value={value}
                  onChange={e => setValue(e.target.value)} />
              <div className="div flex-justify-between">
                  <button
                      className="bg-pink-500 text-white py-2 px-4 rounded-lg">
                      {buttonText}
                  </button>
                  {handleDelete && (
                      <button
                          onClick={handleDelete}
                          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
                       Delete   
                       </button>
                  )}
            </div>
        
          </form>
    </div>
  )
}

export default CategoryForm