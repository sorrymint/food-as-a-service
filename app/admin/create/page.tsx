import Link from 'next/link'
import { createDishForHandling } from '../../actions/database_Resquest'

export default function Create() {
  return (
    <div>
      <Link href={'/menu'}>
      <button
      className='text-blue-400 mb-2 text-xl cursor-pointer'
      >
        <span
        className='ml'
        >&#8592;</span> 
        Menu</button>
        </Link>
        <h2 className='mb-6 font-extrabold'>Create A New Post</h2>
        <form  className='flex flex-col gap-5' action={createDishForHandling}>
            <div>
                <label>Business ID</label>
                <input type="text" 
                name='business_id'
                id='business_id'
                className='w-full p-2 border rounded'
                placeholder='Enter Business ID' 
                required/>
            </div>
            <div>
                <label>Dish Name</label>
                <input type="text" 
                name='name'
                id='name'
                className='w-full p-2 border rounded'
                placeholder='Enter Dish Name' 
                required/>
            </div>
            <div>
              <label>Avtive?</label>
              <input type="checkbox" 
              name="isActive" 
              id="isActive" 
              />
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

            <div>
                <label>Image Name</label>
                <input type="text" 
                name='image'
                id='image'
                className='w-full p-2 border rounded'
                placeholder='Name the Image is Saved as' 
                required/>
            </div>

            <div>
                <label>Price</label>
                <input type="text" 
                name='price'
                id='price'
                className='w-full p-2 border rounded'
                placeholder='Product Price' 
                required/>
            </div>

            <button type='submit' className='bg-blue-500
            text-white px-4 py-2 rounded'>Create Post</button>
        </form>
    </div>
  )
}
  // id: serial('id').primaryKey(),
  // businessId: serial('business_id')
  //   .notNull()
  //   .references(() => businesses.id),
  // name: varchar('name', {length: 100})
  //   .notNull()
  //   .unique(),
  // description: varchar('description', {length: 500})
  //   .notNull(),
  // active: boolean('active')
  //   .notNull(),
  // image: text('image_url'),
  // price: numeric('price'),
  // createdAt: timestamp('created_at').notNull().defaultNow(),
  // updatedAt: timestamp('updated_at').defaultNow()