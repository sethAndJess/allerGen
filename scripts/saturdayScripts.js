const recipeGenApp = {};
const apiUrlFilterByMainIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php'; 
const apiUrlReturnRecipesByID = 'https://www.themealdb.com/api/json/v1/1/lookup.php';

//BUTTON
$('form').on('submit', function(e){
    e.preventDefault();
    recipeGenApp.categoriesQuery();
})
//

const finalRecipes = [];
const finalIngredients = [];
const finalMeasurements = [];

$('ul.recipePreviews').on('click','li.fullRecipe',()=>{
    console.log('i was clicked');
    $('div.directions').removeClass('hidden');
})
//Make this more specific to only select the element that's been clicked on.

//MAIN FUNCTION:
recipeGenApp.categoriesQuery = function(){
    recipeGenApp.userMainIngredient = $('option:selected').attr('value');
    console.log(recipeGenApp.userMainIngredient);
    recipeGenApp.userAllergen = $('input[type="checkbox"]:checked').attr('value');
    console.log('user allergen is:',recipeGenApp.userAllergen);
    $.ajax({
        url: `${apiUrlFilterByMainIngredient}?c=${recipeGenApp.userMainIngredient}`,
        method: 'GET',
        dataType: 'json',
        data: {
            key: 1
        },
    }).then(res => {
        let idArr = res.meals.map(meal => meal.idMeal);
        console.log(idArr)
        const promisesArray = idArr.map(el =>{
            index = el;
            return  $.ajax({
                url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`,
                    method: 'GET',
                    datatype: "json",
                    data: {
                        key: 1
                        }
            })
        })
        $.when(...promisesArray)
            .then((...res) => {
                finalRecipes.length = 0 ;
                res.forEach(function(item){
                    console.log(item[0].meals[0]);
                    if (!item[0].meals[0].strInstructions.includes(recipeGenApp.userAllergen)){
                        finalRecipes.push(item[0].meals[0]);
                    }
                });

                let count = 0;

                finalRecipes.forEach(function(recipe){    
                    count = count + 1;
                    for(i=1;i<21;i++){
                        console.log(recipe[`strIngredient${i}`]);
                       if (recipe[`strIngredient${i}`] !== null){
                           finalIngredients.push(recipe[`strIngredient${i}`]);
                       }
                    }

                    for(i=1;i<21;i++){
                        console.log(recipe[`strMeasure${i}`]);
                       if (recipe[`strMeasure${i}`] !== null){
                           finalMeasurements.push(recipe[`strMeasure${i}`]);
                       }
                    }

                    console.log('count is:', count);
                    
                    $('ul.recipePreviews').append(`
                    <li class="recipe${count} fullRecipe">
                        <p class="title">${recipe.strMeal}</p>
                        <img src="${recipe.strMealThumb}" alt="an image of ${recipe.strMeal}">
                        <div class="directions hidden">
                            <ul class="measurements"></ul> 
                            <ul class="ingredients"></ul>
                            <div class="instructions">
                                <p>${recipe.strInstructions}</p>
                            </div>
                        </div>
                    </li>
                    `);

                    finalIngredients.forEach((ing)=> {
                        $(`li.recipe${count} ul.ingredients`).append(`
                            <li>${ing}</li>
                        `) 
                    });

                    finalMeasurements.forEach((mes)=> {
                        $(`li.recipe${count} ul.measurements`).append(`<li>${mes}</li>`) 
                    });



                    



                    // console.log('our ingredient list to append:',ingredientsToAppend);


                    console.log('finalIngredients array:',finalIngredients);



                    
                     
                    
                    console.log('finalIngredients',finalIngredients);
                    finalIngredients.length = 0;
                    finalMeasurements.length = 0;
                })

            });
    })

};



// const instructionsArr = res.meals.map(recipe => recipe.strInstructions)
                // //LINE BELOW IS ALEX'S CODE + our modifications
                // const filteredRecipes = instructionsArr.filter(recipe => recipe.includes('water') == false && recipe.includes('ginger') == false);
        //        //THIS IS OUR CODE (cannot run both at the same time)
        //         // const filteredRecipes = instructionsArr.filter(recipe =>recipe.strInstructions.includes('garlic')==false
        //         // ); 

        //         // const filteredRecipes = instructionsArr.map(function(recipe){
        //         //     if (recipe.strInstructions.includes('garlic')==false){
        //         //         finalRecipes.push(recipe);
        //         //         // filteredRecipes.pop
        //         //     } 
        //         //     console.log(finalRecipes);
        //         // })
        //         console.log(filteredRecipes);


    // $.when(recipeGenApp.extractIDs).then(console.log(recipeGenApp.extractIDs));

    // <p class="hidden">${recipe.strMeasure1}    ${recipe.strIngredient1}</p>
    //                     <p class="hidden">${recipe.strMeasure2}    ${recipe.strIngredient2}</p>
    //                     <p class="hidden">${recipe.strMeasure3}    ${recipe.strIngredient3}</p>
    //                     <p class="hidden">${recipe.strMeasure4}    ${recipe.strIngredient4}</p>
    //                     <p class="hidden">${recipe.strMeasure5}    ${recipe.strIngredient5}</p>
    //                     <p class="hidden">${recipe.strMeasure6}    ${recipe.strIngredient6}</p>
    //                     <p class="hidden">${recipe.strMeasure7}    ${recipe.strIngredient7}</p>
    //                     <p class="hidden">${recipe.strMeasure8}    ${recipe.strIngredient8}</p>
    //                     <p class="hidden">${recipe.strMeasure9}    ${recipe.strIngredient9}</p>
    //                     <p class="hidden">${recipe.strMeasure10}    ${recipe.strIngredient10}</p>
    //                     <p class="hidden">${recipe.strMeasure11}    ${recipe.strIngredient11}</p>
    //                     <p class="hidden">${recipe.strMeasure12}    ${recipe.strIngredient12}</p>
    //                     <p class="hidden">${recipe.strMeasure13}    ${recipe.strIngredient13}</p>
    //                     <p class="hidden">${recipe.strMeasure14}    ${recipe.strIngredient14}</p>
    //                     <p class="hidden">${recipe.strMeasure15}    ${recipe.strIngredient15}</p>
    //                     <p class="hidden">${recipe.strMeasure16}    ${recipe.strIngredient16}</p>
    //                     <p class="hidden">${recipe.strMeasure17}    ${recipe.strIngredient17}</p>
    //                     <p class="hidden">${recipe.strMeasure18}    ${recipe.strIngredient18}</p>
    //                     <p class="hidden">${recipe.strMeasure19}    ${recipe.strIngredient19}</p>
    //                     <p class="hidden">${recipe.strMeasure20}    ${recipe.strIngredient20}</p>
    //                     <p class="hidden">${recipe.strInstructions}</p>