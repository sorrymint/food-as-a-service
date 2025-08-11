import {
  getAllIngredientsJoined,
  GetAllIngredientsWithDishId,
} from "@/app/actions/database_Resquest";

export async function IngredientsListing(props: { dishId: number }) {
  // const Ingredients = await GetAllIngredientsWithDishId(props.dishId);
  //console.log("Ingedients", Ingredients.map((e) => e.ingredientName))

  const JoinIngredients = await getAllIngredientsJoined(props.dishId);
  console.log("Joined Table", JoinIngredients);

  if (!JoinIngredients) {
    <div>Item Not Found</div>;
  }

  return (
    <div>
      {JoinIngredients.length > 0 ? JoinIngredients.map((Ingredient) => (
        <li key={Ingredient.id} className="list-none py-3">
          <p>
            <span className="font-semibold">{Ingredient.name}</span> -{" "}
            {Ingredient.quantity}
          </p>
          <p className=" text-sm text-gray-600">{Ingredient.des}</p>
        </li>
      ))
    :
    <p>Sorry Ingredients are not available, try another item</p>}
    </div>
  );
}
