const palingdrome=(kata)=>{
    var newkata=kata.split('').reverse()
    newkata=newkata.join('')

    if(newkata == kata){
        return 0
    }else{
        var output=0
        var arrnewkata=kata.split('')
        console.log(arrnewkata)
        var tambahkata=''
        while(true){
            
            tambahkata= arrnewkata[output]+tambahkata
            var katabaru=kata+tambahkata
            output++
            var pembanding=katabaru.split('').reverse().join('')
            // console.log(pembanding)
            if(katabaru == pembanding){
                break
            }
        }
        console.log(katabaru)
        
        return output
    }
}


console.log(palingdrome('shall'))