const divEle = document.createElement('div')
divEle.style.position = 'absolute'
divEle.style.right = '5px'
divEle.style.top = '5px'
// divEle.style.backgroundColor = 'black'

const aEle = document.createElement('a')
aEle.href = "https://github.com/alwxkxk/threejs-example"
aEle.target = "_blank"

const imgEle = document.createElement('img')
imgEle.src= "./static/img/github.svg"
imgEle.style.width = '32px'
imgEle.style.height = '32px'
imgEle.style.cursor = 'pointer'

divEle.appendChild(aEle)
aEle.appendChild(imgEle)
document.body.appendChild(divEle)