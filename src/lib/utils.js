module.exports = {
    age (timestamp) {
        const today = new Date() //criando objeto de data e colocando na variavel today
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
            age = age -1
        } //verifica se ja passou do dia do aniversario ou mes
        
        return age

    },
    date (timestamp) {
        const date = new Date(timestamp) //aqui pega data local, mas trato como data universal abaixo

        // yyyy
        const year = date.getUTCFullYear() //Colocando UTC estamos deixando a data como universal, pois dependendo do local onde estou pode dar problema

        // mm
        const month = `0${date.getUTCMonth() + 1}`.slice(-2) // + 1 para vier numerico. slice podepegar os dois ultimos digitos, se assemelha ao ext texto excel

        // dd
        const day = `0${date.getUTCDate()}`.slice(-2)

        // return yyyy-mm-dd
        return {
            day,
            month,
            year,
           iso: `${year}-${month}-${day}`,
           birthDay: `${day}/${month}`, // retorno tipo ISO
           format: `${day}/${month}/${year}`
        }
    }


}


