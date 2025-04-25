/* 

1- pegar as informações para validação.
2- depois de validar, salvar em uma variavel / localstorage 
    obs: não esquecer: erro aparecendo, botão desabilitado.
3- transformar o que ta salvo em mensagem de whatsapp
    obs: usar \n para quebra de linha 
4- enviar informações 

*/


// variaveis globais 
let variables_for_check = {};

let data_user = {};



// funções globais 
function save_data(key, value)// salva dados na variavel global data_user
{
    data_user[key] = value

    //console.log(data_user)
}

function trigger_warner_message(type, message, classname)// ativa mensagens de erro
{
    let types = ['error', 'caution', 'valid'];
    let class_name = document.querySelector(classname);

    types.forEach(item =>{
        if (item == type){
            class_name.classList.add(item)
        }else{
            class_name.classList.remove(item)
        };
    });

    return class_name.textContent = message;
}

function toggle_warner_container(type, inputname)// altera UI conforme erro
{
    let types = ['error', 'caution', 'valid'];
    let class_name = document.querySelector(inputname)

    types.forEach(item =>{
        if (item == type){
            class_name.classList.add(item)
        } else{
            class_name.classList.remove(item)
        }
    });
}

function transform_date_string(date){
    let dia_mes = date.getDate();
    let dia_semana = dias_semana[dia_na_semana];
    let mes = date.getMonth();
    let ano = date.getFullYear();

    let dia_na_semana = date.getDay()

    let dias_semana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira',
                       'quinta-feira', 'sexta-feira', 'sábado'];

    return `${dia_mes}/${mes}/${ano} - ${dia_semana}`
}




// funções que vão dar UI de erro e acrescentar no user_data
function trigger_name(){
    let user_name = document.getElementById('user_name');

    const regex_rules = {
        name_rules: /^[a-zA-ZÀ-ÿ\s]+$/,
        tel_rule: /^[0-9]+$/
    }

    // validacao de nome
    user_name.addEventListener('blur', (event)=>{
        let name = event.target.value;

        if(name.length <= 2){
            trigger_message = 'Atenção! Nome curto demais.';
            trigger_warner_message('error', trigger_message, '.trigger_name');
            toggle_warner_container('error', '.trigger_name');
            checker_validation('name', 'invalid', '');

            delete data_user.nome;

        }else if(regex_rules.name_rules.test(name)){
            trigger_message = 'Nome válido.';
            trigger_warner_message('valid', trigger_message, '.trigger_name');
            toggle_warner_container('valid', '.name_input');
            checker_validation('name', 'valid', '');
            
            save_data('nome', name);
            
        } else{
            trigger_message = 'Atenção! Você digitou algo errado.'
            trigger_warner_message('error', trigger_message, '.trigger_name');
            toggle_warner_container('error', '.name_input');
            checker_validation('name', 'invalid', '');

            delete data_user.nome;
        }
    });        
    
};

function trigger_tel(){
    let user_tel = document.getElementById('user_tel');

    let trigger_message = '';

    const regex_rules = {
        name_rules: /^[a-zA-ZÀ-ÿ\s]+$/,
        tel_rule: /^[0-9]+$/
    }

    //validação de telefone
    user_tel.addEventListener('blur', (event) =>{
        let tel = event.target.value;


         if(tel.length != 11 && regex_rules.tel_rule.test(tel)){
            trigger_message = 'Atenção! Número curto demais.'
            trigger_warner_message('error', trigger_message, '.trigger_tel');
            toggle_warner_container('error', '.tel_input');
            checker_validation('tel', 'invalid', '');

            delete data_user.telefone

        } else if(regex_rules.tel_rule.test(tel)){
            trigger_message = 'Número válido.'
            trigger_warner_message('valid', trigger_message, '.trigger_tel');
            toggle_warner_container('valid', '.tel_input');
            checker_validation('tel', 'valid', '');

            save_data('telefone', tel);

        }else{
            trigger_message = 'Atenção! Parece que você digitou algo errado.'
            trigger_warner_message('error', trigger_message, '.trigger_tel');
            trigger_warner_message('error', '.tel_input');
            checker_validation('tel', 'invalid', '');

            delete data_user.telefone
        };


        
    });
}

function trigger_services(){
    let select_input = document.querySelectorAll('.select_input');
    let message_select_erro = document.querySelector('.trigger_selec_input')

    // criar um objeto para salvar os serviços
    const services = {
        sobrancelha: '',
        cilios: ''
    };

    //iterar nos selects para pegar o name e adicionar no objeto
    select_input.forEach(input =>{
        let input_name = input.getAttribute('name');

        input.addEventListener('blur', (event) =>{
            let input_value = event.target.value;

            if(input_name == 'sobrancelha'){

                input_value = input_value.replace('_', ' ');
                services.sobrancelha = input.value
            } else{
                input_value = input_value.replace('_', ' ');
                services.cilios = input.value
            };

            //comparar chaves para validação
            if(services.sobrancelha === services.cilios){
                let trigger_message = "Você tem que escolher pelo menos um serviço."

                trigger_warner_message('error', trigger_message, '.trigger_selec_input')

                delete data_user["serviço de sobrancelha"]
                delete data_user["serviço de cilios"]

            }else{
                trigger_message = 'Escolhas válidas.';
                trigger_warner_message('valid', trigger_message, '.trigger_selec_input')

                save_data('serviço de sobrancelha', services.sobrancelha);
                save_data('serviço de cilios', services.cilios);
            }

        });

        
    });
    
};



// funções de validação exclusivamente: vão validar o input conforme a presença da chave
function validate_name(){
    let name_is_valid = data_user.hasOwnProperty('nome');

        if(name_is_valid){
            return 'valid'
        } else{
            return 'invalid'
        }
}

function validate_tel(){
    let tel_is_valid = data_user.hasOwnProperty('telefone');

        if(tel_is_valid){
            return 'valid'
        } else{
            return 'invalid'
        }
}

function validate_services(){
    let eyebrow_is_valid = data_user.hasOwnProperty('serviço de sobrancelha');
    let eyelash_is_valid = data_user.hasOwnProperty('serviço de cilios');

    if(eyebrow_is_valid && eyelash_is_valid){
        console.log('Validação de serviços: VÁLIDO')
        return 'valid'

    } else{
        console.log('Validação de serviços: INVÁLIDO')
        return 'invalid'
    }
}



// chamando as funções conforme necessário 

window.addEventListener('load', ()=>{
    trigger_name();
    trigger_tel();
    trigger_services();

    

});
    

let button_submit = document.querySelector('.button_submit');
let form = document.querySelector('.formulario_container')

    form.addEventListener('submit', (event) =>{
        let data_user_lenght = Object.keys(data_user).length;

        if(data_user_lenght < 6){
            event.preventDefault();
            // verificação manual de qual input está inválido
            //input de nome
            if(validate_name() === 'invalid'){
                let section = document.querySelector('.name_input');
                section.scrollIntoView({behavior: "smooth"});
                section.focus();
            } else if(validate_tel() === 'invalid'){
                let section = document.querySelector('.tel_input');
                section.scrollIntoView({behavior: "smooth"});
                section.focus();
            } else if(validate_services() === 'invalid'){
                let section = document.querySelector('.services_section_form');
                section.scrollIntoView({behavior: "smooth"});
                section.focus();
            }
        }     

    });
    




