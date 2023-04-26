let testUser = new userModel({name: "Jakub", password: "1234", email: "test@gmail.com" });
let product1 = new productModel({name: "Pilot TV", price: 1200})
product1.save()

// console.log(testUser);
// console.log(product1);

// testUser.favouriteProducts.push(product1)
// console.log(testUser)
// testUser.updateOne()

const updateUserFavouriteProduct = async (ownerUser, productId) => {
    let owner = await userModel.findOne({name: ownerUser})
    let product = await productModel.findOne({name: "Pilot TV"})
    console.log(product._id.toHexString())

    // Save product to user's favouriteProducts array
    // owner.favouriteProducts.push(product)
    // console.log(owner)
    // await owner.save()
    owner.showAllFavouriteProducts();
}

updateUserFavouriteProduct("Jakub", "6447d883516b6d319221d70a");

const getUserData  = async () => {
    let x = await userModel.find({name: "Jakub"})
    console.log(x)
}

// getUserData()