const fs = require('fs');

const path = './productsData.json'

class ProductManager{
   
    
    constructor(){
 
        
        this.products=[];
        
        
    }
    getProducts(){
        if(fs.existsSync(path)){
           let products = fs.readFileSync(path, 'utf-8');
           return JSON.parse(products)
        }else{
            console.log('no hay productos')
        }
        
    }
   
    addProduct(title, description, price, thumbnail,  stock){
    const product = {
        title,
        description,
        price,
        thumbnail,
        id: this.#nuevoId() + 1,
        stock
        
    };
    if(fs.existsSync(path)){
         this.products= JSON.parse(fs.readFileSync(path,'utf-8'))
    }
      
    const productExists = this.products.find(p => p.title === product.title);
   
    if (productExists) {
        console.log("Este producto ya existe en la lista.");
    } else {
        this.products.push(product);
         fs.writeFileSync(path, JSON.stringify(this.products ))
    }
   
   }
   
   #nuevoId(){
    let maxId = 0;
    this.products.map((product) => {
        if(product.id > maxId) maxId = product.id;
    });
    return maxId;
}id

getProductsById(id){
     let read = fs.readFileSync(path, 'utf-8')
     let parse = JSON.parse(read)
    return parse.filter(code => code.id === id)

}

updateProduct(id, updateProp, value){
    
        let productUDT = this.getProductsById(id);
        if (productUDT){
           productUDT[0][updateProp]= value
               console.log(productUDT) 
            }
            
         else {
            console.log('este producto para actualizar no existe!');
        }
    
}
deleteProduct(id){
    let productToDelete =this.getProductsById(id)
    if(fs.existsSync(path)){
        this.products= JSON.parse(fs.readFileSync(path,'utf-8'))
   }
    if (productToDelete){
       let otherObj = this.products.filter(obj=> obj.id !== id)
        fs.writeFileSync(path, JSON.stringify(otherObj ))
         }
         
      else {
         console.log('este producto para actualizar no existe!');
     }

}


}
productManager = new ProductManager()
// console.log(productManager.getProducts())

// productManager.addProduct("naranja", "una naranja", 4, "thumbnail",  8)
 productManager.deleteProduct(2)
//  console.log(productManager.getProducts())

// console.log(productManager.getProductsById(50))
//  productManager.addProduct("manzana", "una manzana", 3, "thumbnail",  4)

// fs.appendFileSync
// fs.unlinkSync
