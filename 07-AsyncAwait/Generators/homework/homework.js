function* fizzBuzzGenerator(max) {
  // Tu código acá:
    let i = 1;
    while (max ? i <= max : true){  //verificamos si se pasa o no un argumento, si no pasa ordenamos a la func mantenerse en true
      if (i % 3 === 0 && i % 5 === 0) {  // se setean las condiciones solicitadas 
        yield "Fizz Buzz"
      } else if(i % 3 === 0) {
        yield "Fizz"
      } else if (i % 5 === 0){
        yield "Buzz"      // con cada yield detenemos la func para que nos arroje el resultado solicitado en caso de cumplir la condición
      }else {
        yield i;
      }
      i++ //al ser un while se le ordena a la i seguir incrementando por cada iteración para que no se genere un bucle infinito
    }
  }
  // var fizzBuzz = fizzBuzzGenerator();    // ya se ejecuta por los tests pero tomar en cuenta que esto se necesitaría para ejecutar directamente en la consola :)


module.exports = fizzBuzzGenerator;
