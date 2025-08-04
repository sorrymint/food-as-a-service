import { GetAllIngredientsWithDishId } from "@/app/actions/database_Resquest"

export async function IngredientsListing(props: {dishId: number}) {

    const Ingredients = await GetAllIngredientsWithDishId(props.dishId);
    console.log(Ingredients)

    if(!Ingredients){
       <div>Item Not Found</div>
    }

  return (
    <div>
        
        <h2>Ingredients Listing</h2>
        
        {Ingredients.map( (Ingredient) => (
            <li key={Ingredient.id} className="list-none">
                <p className="font-bold">{Ingredient.ingredientName}</p>
            </li>
        ))}
    </div>
  )
}
