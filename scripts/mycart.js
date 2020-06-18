fetch('/mycart').then(response=>{
   if(response.ok){
       return response.json();
   }
}).then(response=>{
    console.log(response);
    
    const source = document.getElementById('myCart').innerHTML;
    
    const template = Handlebars.compile(source);
    
    const context = {
        myCart: response.data
    };
    
    const compiledHtml = template(context);
    
    const container = document.getElementById('mainContainer');
    container.innerHTML = compiledHtml;
});