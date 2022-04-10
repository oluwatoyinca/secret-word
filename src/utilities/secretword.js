const isSquare = (a) =>
{
    var sum = 0
    var n = a.length
    for (var i=0; i<n; i++){
       sum += a[i].length;
    }

    const average = sum/n
    if(!Number.isInteger(average)) {
       throw "All words should have the same length"
    }

    if(!(average == n)) {
       throw "The box must have the same number of rows and columns"
    }
}

const validateWordsBox = (req) => {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?A-Z\d]+/
    const createKeys = Object.keys(req.body)
    const mandatoryKey = 'wordsBox'
      
    if(!createKeys.includes(mandatoryKey) || (req.body.wordsBox == "")) {
        throw "wordsBox is mandatory, it should have at least 4 words of 4 letters each"
    }
  
    const hasSpecialChar = req.body.wordsBox.find((word) => {
        return format.test(word)
    })
  
    const hasShortLength = req.body.wordsBox.find((word) =>{
        return word.length < 4
    }) 
  
    if(hasSpecialChar) {
        throw "Only lower case letters are allowed"
    }

    if(hasShortLength) {
        throw "Each word should have at least 4 letters"
    }
  
    isSquare(req.body.wordsBox)
}

const checkSecret = (req,res) => {
    var secretWords = []
    var secretKey = /[aeiou][aeiou][^aeiou][^aeiou]/
    req.body.wordsBox.forEach((word)=>{
        if(secretKey.test(word)){
            secretWords.push(...secretKey.exec(word))
        }
    })

    const count = secretWords.length
    if(count > 0) {
        res.status(200).send({count, secretWords})
    }
    else {
        res.status(404).send({count, secretWords})
    }
}
    
module.exports = {
    validateWordsBox,
    checkSecret
}