const palingdrome=(kata)=>{
    var newkata=kata.split('').reverse()
    newkata=newkata.join('')

    if(newkata == kata){
        return 0
    }else{
        var output=0
        var arrnewkata=kata.split('')
        console.log(arrnewkata)
        while(true){
            
            var katabaru=kata
            output++
            for(let i=output-1;i>=0;i--){
                katabaru+=arrnewkata[i]
            }
            var pembanding=katabaru.split('').reverse().join('')
            // console.log(pembanding)
            if(katabaru == pembanding){
                break
            }
            
        }
        
        return output
    }
}


console.log(palingdrome('sit'))