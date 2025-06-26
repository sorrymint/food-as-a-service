import React from 'react'

export default function Create() {
  return (
    <div>
        <h2 className='mb-6'>Create A New Post</h2>
        <form action="">
            <div>
                <label>Title</label>
                <input type="text" 
                name='title'
                id='title'
                className='w-full p-2 border rounded' 
                required/>
            </div>
            <div>
                <label>Discription</label>
                <textarea 
                name='discription'
                id='discription'
                className='w-full p-2 border rounded'
                required  
                rows={5}
                />
            </div>
            <button type='submit' className='bg-blue-500
            text-white px-4 py-2 rounded'>Create Post</button>
        </form>
    </div>
  )
}
