function add(n1, n2) {
    return n1 + n2;
  }
  
  function multiply(n1, n2) {
    return n1 * n2;
  }
  
  function subtract(n1, n2) {
    return n1 - n2;
  }
  
  function divide(n1, n2) {
    return n1 / n2;
  }

  // export default and non-default items
  export default add 
  export {multiply, subtract, divide}