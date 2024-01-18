async function getProductData(url, selectedTab) {
    let response = await fetch(url);
    console.log(response);
    let data = await response.text();
    handleData(JSON.parse(data), selectedTab);
}

function handleData(data, tabText) {
    console.log(data.categories);
    let products = data.categories.filter(category => category.category_name === tabText);
    products[0]?.category_products?.forEach(product => {
        console.log(product);
        addProduct(product);
    });
    document.getElementById("loader").style.display = 'none';
}

function clearContent(){
    document.getElementById("products-section").innerHTML="";
}

function addProduct(product){
    let node = document.getElementById("products-section-template").cloneNode(true);
    node.querySelector('img').setAttribute("src", product.image);
    node.querySelector('.product-title').textContent=product.title;
    node.querySelector('.vendor').textContent=product.vendor;
    node.querySelector('.price').textContent="Rs "+product.price;
    node.querySelector('.compare-at-price').textContent=product.compare_at_price;
    if(product.price < product.compare_at_price){
        node.querySelector('.discount').textContent=(100-100*(product.price/product.compare_at_price)).toFixed(2) +"% Off";
    }
    node.removeAttribute("id");
    node.setAttribute("class","products-section-item");
    document.getElementById("products-section").appendChild(node);
}

const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener("click", function(event) {
        console.log(event);
        let target = event.currentTarget;
        let tabId = target.getAttribute("id");
        console.log(tabId);
        clearContent();
        document.getElementById("loader").style.display = 'flex';
        let tabsList = document.querySelectorAll(".tab");
        for (let i = 0; i < tabsList.length; i++) {
          tabsList[i].classList.remove("active");  
        }
        target.classList.add("active");
        getProductData("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json", tabId);
        
    });
});


tabs[0].click();

