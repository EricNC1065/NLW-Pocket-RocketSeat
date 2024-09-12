const { select, input, checkbox } = require('@inquirer/prompts')

let mensagem = "Bem-vindo ao app de metas"

let meta = {
    value: 'tomar 2L de agua todos os dias',
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input ({message: "Digite a meta: "})

    if(meta.length == 0){
        mensagem = "A meta não pode ser vazia"
        return
    }

    metas.push(
        { value: meta, checked: false}
    )

    mensagem = "Meta cadastrada com sucesso"

}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "use as setas para mudar de meta, o espaco para marcar ou desmarcar e o enter para finalizar esta etapa",
        choices: [...metas],
        instructions: false,

    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        mensagem = "nenhuma meta selecionada "
        returns
    }


    respostas.forEach((resposta) => {
        const meta = metas.find((m) =>{
            return m.value == resposta
        })

        meta.checked = true

        mensagem = "Meta(s) marcadas como concluida(s)"
    })


} 


const metasRealizadas = async ()  => {

    const realizadas = metas.filter((meta)  => {
        return meta.checked
    })

    if(realizadas == 0){
       mensagem = 'Não existem metas realizadas :('
        return
    }

    await select ({
        message: realizadas.length + " Metas realizadas",
        choices: [...realizadas]
    })

}

const metasAbertas = async ()  => {
    const abertas = metas.filter((meta) => {

        return meta.checked != true
    })

    if(abertas.length == 0){
        mensagem = "Não existem metas abertas  :)"
        return
    }

    await select ({
        message: abertas.length + " Metas Abertas",
        choices: [...abertas]
    })


}

const deletarMetas = async () => {

    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false}
    })

    const itemADeletar = await checkbox({
        message: "Selecione a meta a deletar",
        choices: [...metasDesmarcadas],
        instructions: false,

    })

    if(itemADeletar.length == 0){
        mensagem = "Nenhum item para deletar"
        return
    }

    itemADeletar.forEach((item) =>{
        metas = metas.filter((meta) => {
            return meta.value != value
        })

    })


}

const mostrarMensagem = async () => {
    console.clear();

    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () =>{
    

    while( true ){

        mostrarMensagem()

        const opcao = await select({
            message: "menu >",
            choices:[
                {
                    name: "Cadastrar metas",
                    value: "cadastrar"
                },

                {
                    name: "Listar metas",
                    value: "listar"
                },

                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },

                {
                    name: "Metas abertas",
                    value: "abertas"
                },

                {
                    name: "Deletar metas",
                    value: "deletar"
                },

                {
                    name: "Sair",
                    value:"sair"
                }
            ]
    })

        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                break

            case "listar":
                await listarMetas()
                break

            case "realizadas":
                await metasRealizadas()
                break

            case "abertas":
                await metasAbertas()
                break

            case "deletar":
                await deletarMetas()
                break

            case "sair":
            console.log("Ate a proxima")
                return        
        }
    }
}

start()