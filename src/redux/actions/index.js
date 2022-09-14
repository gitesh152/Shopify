//For add item to cart item

export const addCart = (product) =>{
    return {
        type:"ADDITEM",
        payload: product
    }
}

//for deleting the item from cart

export const delCart = (product) =>{
    return {
        type:"DELITEM",
        payload: product
    }
}