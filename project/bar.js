var open = false
function barclick(){
    console.log(document.body.offsetWidth)
    if(open){
        document.getElementById('headerMenu').style.display='none'
        // document.getElementById('headerMenu').style.height='0px'
    }else{
        document.getElementById('headerMenu').style.display='flex'
        // document.getElementById('headerMenu').style.transition='1s'
        // document.getElementById('headerMenu').style.height='230px'

    }
    open=!open
}
console.log('dadsad')