module.exports = (temp, product) => {
  //to set each unique values to their places we can do them seperately and easily here
  //first let we let output = temp
  //then we do temp.replace to replace our marker %PRODUCTNAME% whwerever in the html to whatever is in our array product.productName
  //so also images, prices, etc
  let output = temp.replaceAll("{%PRODUCTNAME%}", product.productName);
  output = output.replaceAll("{%IMAGE%}", product.image);
  output = output.replaceAll("{%PRICE%}", product.price);
  output = output.replaceAll("{%FROM%}", product.from);
  output = output.replaceAll("{%NUTRIENTS%}", product.nutrients);
  output = output.replaceAll("{%QUANTITY%}", product.quantity);
  output = output.replaceAll("{%DESCRIPTION%}", product.description);
  output = output.replaceAll("{%ID%}", product.id);

  if (!product.organic)
    output = output.replaceAll("{%NOT_ORGANIC%}", "not-organic");

  return output;
};
