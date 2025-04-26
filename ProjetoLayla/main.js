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

let daily_periods_copy = {};

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
    
    let mes = date.getMonth();
    let ano = date.getFullYear();

    let dia_na_semana = date.getDay()

    let dias_semana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira',
                       'quinta-feira', 'sexta-feira', 'sábado'];

    let dia_semana = dias_semana[dia_na_semana];

    return `${dia_mes}/${mes}/${ano} - ${dia_semana}`
}

function transform_periodsList_toString(object){
    let translate_toString = '';

    for (let key in object){
        translate_toString += `${object[key]} |`
    }

    return translate_toString
}

function trigger_submit_error(status) // mensagem de errosubmit
{ 
    let message_container = document.querySelector('.trigger_invalid_form');
    if(status == 'limpar'){
        message_container.classList.remove('error')
    } else{
        message_container.classList.add('error');
        message_container.textContent = `Atenção! Você contém campos inválidos no formulário.
                                         Por favor, preencha os campos corretamente e envie novamente.`
    }
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
            delete data_user[`${name}`]



        }else if(regex_rules.name_rules.test(name)){
            trigger_message = 'Nome válido.';
            trigger_warner_message('valid', trigger_message, '.trigger_name');
            toggle_warner_container('valid', '.name_input');

            
            save_data('nome', `${name}`);
            
        } else{
            trigger_message = 'Atenção! Você digitou algo errado.'
            trigger_warner_message('error', trigger_message, '.trigger_name');
            toggle_warner_container('error', '.name_input');
            checker_validation('name', 'invalid', '');

            delete data_user[`${name}`]

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

            delete data_user.telefone

        } else if(regex_rules.tel_rule.test(tel)){
            trigger_message = 'Número válido.'
            trigger_warner_message('valid', trigger_message, '.trigger_tel');
            toggle_warner_container('valid', '.tel_input');


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

function trigger_data(){
    let date_input = document.getElementById('calendar_input');
    let getting_date_today = new Date();
    let trigger_message = '';
    let message_input = document.querySelector('.trigger_date')

    date_input.addEventListener('change', (event) =>{
        let date_event = new Date(event.target.value + 'T00:00:00');

        // resetando a hora pra n dar erro com milisegundos
        date_event.setHours(0, 0, 0, 0);
        getting_date_today.setHours(0, 0, 0, 0);

        // comparando as datas

        if(date_event.getTime() < getting_date_today.getTime()){
            //se sim quer dizer que a data já passou 
            date_input.classList.add('error');
            trigger_message = "Atenção! Esta data já passou.";
            message_input.classList.add('error');

            trigger_warner_message('error', trigger_message, '.trigger_date');
            
            delete data_user.Data


        }else if ( date_event.getTime() === getting_date_today.getTime() ){
            // escolha do dia atual como data de agendamento
            date_input.classList.add('warning');
            trigger_message = 'Cuidado! Você escolheu hoje, está muito próximo.';
            message_input.classList.add('warning')

            trigger_warner_message('warning', trigger_message, '.trigger_date');

            delete data_user.Data


        } else{
            // data posterior a data atual do agendamento
            date_input.classList.add('valid');
            trigger_message = 'Data válida.';
            message_input.classList.add('valid')

            trigger_warner_message('valid', trigger_message, '.trigger_date');

            // chamando função pra formatar a data em string
            let date_user =  transform_date_string(date_event)

            save_data('Data', date_user);
        }


    })
}

function trigger_day_periods(){
    let dayily_periods_buttons = document.querySelectorAll('.input_time');
    let message_input = document.querySelector('.trigger_daily_period');
    let trigger_message = ''
    let dayily_periods_list = {};
    let day_period = ''
    
    dayily_periods_buttons.forEach(button =>{
        button.addEventListener('change', () =>{
            day_period = button.getAttribute('name')
            let label = document.querySelector(`label[for="${day_period}"]`);

            // conferindo se o botao ta checked pra adicionar à lista e a classe
            if(button.checked){
                // conferindo se ja não tem correspondencia pra evitar duplicatas
                if(dayily_periods_list.hasOwnProperty(day_period)){
                    day_period = ''
                } else{
                    dayily_periods_list[`${day_period}`] = true;
                    label.classList.add('active')
                };
            }else{
                delete dayily_periods_list[`${day_period}`];
                label.classList.remove('active');
            };


            // validando para escolher pelo menos um período
            if(Object.keys(dayily_periods_list).length === 0){
                trigger_message = 'Atenção! Você precisa escolher pelo menos um período do dia.'
                trigger_warner_message('error', trigger_message, '.trigger_daily_period');

            } else{
                trigger_message = 'Período(s) válido(s)!';
                trigger_warner_message('valid', trigger_message, '.trigger_daily_period');

                
            };

            // copoiando o objeto pra outro global 
            daily_periods_copy = structuredClone(dayily_periods_list)


        })
    });

    
}

function trigger_message_user(){
    // vai contar quantos caracteres estão sendo escritos pelo usuario. 
    // vai dar feedbackvisual quando chegar no limite máximo
    let message_input = document.getElementById('user_message');
    let counter_container = document.querySelector('.counter_char_container');
    let max_length = message_input.getAttribute('maxlength');

    message_input.addEventListener('input', () =>{
        let message_user = message_input.value

        if(message_user.length < max_length){
            message_input.classList.remove('error');
            counter_container.style.color = '#6f6e6e';
            
        } else if(message_user.length == max_length){
            message_input.classList.add('error');
            counter_container.style.color = '#c50303';

        }
        counter_container.textContent = `${message_user.length}/${max_length}`
    }) ;

    message_input.addEventListener('blur', (event) =>{
        let userObs = event.target.value;

        if(userObs.length < max_length && userObs != ''){
            save_data('observação', `${userObs}`);
        } else{
            delete data_user["observação"]
        }

    })
}



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

function validate_date(){
    let date_is_valid = data_user.hasOwnProperty('Data');

    if(date_is_valid){
        return 'valid'
    } else{
        return 'invalid'
    }
}

function validate_daily_periods(){
    let period_is_valid = Object.keys(daily_periods_copy).length

    if(period_is_valid == 0){
        return 'invalid'
    } else{
        return 'valid'
    }
}


// começo do script

window.addEventListener('load', ()=>{
    // acionando os triggers de erro dos inputs
    trigger_name(); trigger_tel(); trigger_services();
    trigger_data(); trigger_day_periods(); trigger_message_user();


    // mostrando a confirmação da data ao usuário 
    let display_date = document.querySelector('.data_confirmation_content');

    let inputs_onChange = document.querySelectorAll('.input_onChange')

    inputs_onChange.forEach(input=>{
        input.addEventListener('change', ()=>{
            if(validate_date() === 'invalid' && validate_daily_periods() === 'invalid'){
                display_date.textContent = ''
            } else{
                let date_toConfirm = data_user['Data'];
                display_date.innerHTML = `Dia: ${date_toConfirm}<br> Períodos livres: ${Object.keys(daily_periods_copy)}`
            }
        });

    });

    //pegando a confirmação do periodo para salvar no data_user
    let confirm_button = document.getElementById('confirm_input');

    confirm_button.addEventListener('change', () =>{
        if(confirm_button.checked){
            let periods_toString = '';
            confirm_button.style.width = '20px';
    
            for(let key in daily_periods_copy){
                periods_toString += `${key}; ` 
            };
    
            save_data('Período Livre', `${periods_toString}`)
        };

    })



    // evento de submit do form
    let button_submit = document.querySelector('.button_submit');
    let form = document.querySelector('.formulario_container')

    form.addEventListener('submit', (event) =>{
        let data_user_lenght = Object.keys(data_user).length;

        if(data_user_lenght < 6){
            event.preventDefault();
            // verificação manual de qual input está inválido

            if(validate_name === 'invalid' || validate_tel() === 'invalid' || validate_services() === 'invalid' 
               || validate_date() === 'invalid' || validate_daily_periods()){

                    trigger_submit_error('');
               }
        }else{
            trigger_submit_error('limpar');
        }     

    });


});
  






let show_data = document.querySelector('.show_data')
let display_data = document.querySelector('.display_data')
let texto = ''

show_data.addEventListener('click', () =>{
    for (let key in data_user){
        texto += `${key}: ${data_user[key]} | `
    };

    display_data.textContent = texto
});


    




