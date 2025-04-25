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

    console.log(data_user)
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

function toggle_submit_button(status)// desabilita/habilita botão conforme status dos inputs
{
    let button = document.querySelector('.button_submit');
    
        if(status === 'invalid'){
            button.disabled = true;
            return 'invalid';

            
        }else{
            button.disabled = false;
            return 'valid'
        }
    

};

function checker_validation(key, value, clear){
    let counter = 0;

    if(clear == 'limpar'){
        variables_for_check = {}
    } else{
        variables_for_check[key] = value;
    }

    Object.keys(variables_for_check).forEach(chave =>{
        let status = variables_for_check[chave]

        if(status == 'invalid'){
            counter += 1;
        }

        
    });

    if(counter > 0){
        return 'invalids inputs'
    } else{
        return 'valids inputs'
    }
}





// funções de validação
function validate_contact_info(){
    let user_name = document.getElementById('user_name');
    let user_tel = document.getElementById('user_tel');

    let trigger_message = ''

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

            toggle_submit_button('invalid');

        }else if(regex_rules.name_rules.test(name)){
            trigger_message = 'Nome válido.';
            trigger_warner_message('valid', trigger_message, '.trigger_name');
            toggle_warner_container('valid', '.name_input');
            checker_validation('name', 'valid', '');
            
            save_data('nome', name);
            toggle_submit_button('valid');
            
        } else{
            trigger_message = 'Atenção! Você digitou algo errado.'
            trigger_warner_message('error', trigger_message, '.trigger_name');
            toggle_warner_container('error', '.name_input');
            checker_validation('name', 'invalid', '');

            toggle_submit_button('invalid');
        }
    });

    //validação de telefone
    user_tel.addEventListener('blur', (event) =>{
        let tel = event.target.value;


         if(tel.length != 11 && regex_rules.tel_rule.test(tel)){
            trigger_message = 'Atenção! Número curto demais.'
            trigger_warner_message('error', trigger_message, '.trigger_tel');
            toggle_warner_container('error', '.tel_input');
            checker_validation('tel', 'invalid', '');

            toggle_submit_button('invalid');

        } else if(regex_rules.tel_rule.test(tel)){
            trigger_message = 'Número válido.'
            trigger_warner_message('valid', trigger_message, '.trigger_tel');
            toggle_warner_container('valid', '.tel_input');
            checker_validation('tel', 'valid', '');

            save_data('telefone', tel);
            toggle_submit_button('valid');

        }else{
            trigger_message = 'Atenção! Parece que você digitou algo errado.'
            trigger_warner_message('error', trigger_message, '.trigger_tel');
            trigger_warner_message('error', '.tel_input');
            checker_validation('tel', 'invalid', '');

            toggle_submit_button('invalid');
        };


        
    });

    // validar ambos os campos para dar o return da função
    if(checker_validation() == 'invalids inputs'){
        return 'invalid'
    } else{
        return 'valid'
    }


};

function validate_services(){
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

                toggle_submit_button('invalid');
            }else{
                trigger_message = 'Escolhas válidas.';
                trigger_warner_message('valid', trigger_message, '.trigger_selec_input')

                save_data('serviço de sobrancelha', services.sobrancelha);
                save_data('serviço de cilios', services.cilios);

                toggle_submit_button('valid');
            }

            //console.log(data_user);
        });

        
    });
    
};

// funções de coleta de informações



// chamando as funções conforme necessário 

window.addEventListener('load', ()=>{
    validate_contact_info();
    validate_services();



    let button_submit = document.querySelector('.button_submit');
    let form = document.querySelector('.formulario_container')

    form.addEventListener('submit', (event) =>{
        if(toggle_submit_button() === 'invalid'){
            button_submit.disabled = true;
            event.preventDefault();
            
            // adicionar a verificação manual dos serviços aqui
        } else{
            button_submit.disabled = false;
        }
    });
    
    
})



