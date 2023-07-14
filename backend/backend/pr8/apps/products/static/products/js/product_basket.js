var products_ids = [];


function add_product_to_basket(product_id) {
    let has = false;
    products_ids.forEach(element => {
        if (element == product_id) {
            has = true;
            return;
        }
    });
    if (!has)
        products_ids.push(product_id);
}


function remove_product_from_basket(product_id) {
    products_ids = products_ids.filter(function(obj) {
        return obj !== product_id;
    });
}
