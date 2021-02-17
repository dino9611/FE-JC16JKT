var arr = [1,2,3,4,5]  // 2,3,4,5,1
var newarr='33 47 70 37 8 53 13 93 71 72 51 100 60 87 97'.split(' ')

function leftArr(a=arr,d){
    var result=a
    for(let i=0;i<d;i++){
        // var newarr=new Array(result.length)
        // for(let j=0;j<newarr.length;j++){
        //     newarr[j]=result[(j+1)%result.length]
        //     // newarr[1]=result[2]
        //     // newarr[2]=result[3]
        //     // newarr[3]=result[4]
        //     // newarr[4]=result[0]
        // }
        // result=newarr

        var depan=result.shift()
        result.push(depan)

    }
    return result
}
// console.log(leftArr(newarr,13))




const lelang=(menit)=>{
    var bunga
    var hargaawal=10000
    for(let i=1;i<=menit;i++){
        bunga=0.2
        if(i % 4 == 0){
            bunga =0.1
        }
        hargaawal+= Math.ceil(hargaawal*bunga)
    }

    return hargaawal > 30e6 ? "sudah terjual" : hargaawal

}

console.log(lelang(49))

var list=[5,1,4,2,8] // 
var list=[1,2,4,7,8] // 
//bubble sort big 0(n^2)
// big 
var hitung=0
// 1,2,3,4,5
for(let i=0;i<list.length;i++){
    var looping=false
    // hitung++
    for(let j=0;j<list.length-1;j++){
        if(list[j]>list[j+1]){
            var temp=list[j+1]
            list[j+1]=list[j]
            list[j]=temp
            looping=true
            // kalo koding tidak masuk di dalam if ini artinya array sudah sort
        }
        hitung++
    }
    if(!looping){
        break
    }

}

console.log(list)
console.log(hitung)
