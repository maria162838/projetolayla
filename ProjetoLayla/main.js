/* as funções neste arquivo estão divididas em categorias para facilitar
a organização do documento e a sua manuntenção. As funções são chamadas
no final do documento

Cada função começa com o nome da sua categoria, sendo elas: 

i. clicker: vai criar uma ação a partir do clique do usuário;
ii. inspector: vai inspecionar um input para validar as informações do usuário;

*/



// inspectors 
function inspector_contact_info(){
    //validação dos inputs de contato do usuário 

    let user_name_input = document.getElementById('user_name');
    let user_tel_input = document.getElementById('user_tel');
    let error_message = document.querySelectorAll('.input_mensagem');
    // -> index para nome: 0 ;; index para whatsapp: 1  ;;

    let inputs_form = document.querySelector('.contact_input')
    // para alteração de estilo mais fácil

    const validations_rules ={
        name_char: /^[a-zA-ZÀ-ÿ\s]+$/,
        tel_char: /^[0-9()\-\s]+$/,  
    };
    // -> regex's em forma de objeto para facilitar a validação sem muitas variáveis


    user_name_input.addEventListener('input', (event)=>{
        let name_value = event.target.value;

        // conferindo a digitação do usuário
        if( validations_rules.name_char.test(name_value) ){
            error_message[0].style.display = 'flex'
            error_message[0].textContent = 'Formato aceito!';

            error_message[0].classList.add('valid');
            error_message[0].classList.remove('warning');
            error_message[0].classList.remove('error');


        } else{
            error_message[0].classList.add('error');
            error_message[0].classList.remove('warning');
            error_message[0].classList.remove('valid');

            error_message[0].style.display = 'flex';
            error_message[0].textContent = 'Atenção! Parece que você digitou errado.';
            
        } 

        if(name_value == ''){
            
            error_message[0].classList.add('error');

            error_message[0].classList.remove('warning');
            error_message[0].classList.remove('valid');

            error_message[0].style.display = 'flex';
            error_message[0].textContent = 'Atenção! O campo precisa ser preenchido.';
        }

        if (name_value.length == 20){
            error_message[0].classList.add('warning')

            error_message[0].classList.remove('valid');
            error_message[0].classList.remove('error');

            
            error_message[0].style.display = 'flex';
            error_message[0].textContent = 'Cuidado! Você não pode escrever mais.';
        }
    })

    user_tel_input.addEventListener('input', (event) =>{
        let tel_value = event.target.value;
        let tel_input_status = false;


        // mascarando o número 
        let tel_cleaned = tel_value.replace(/\D/g, '');

        tel_cleaned = tel_cleaned.replace(/^(\d{0,2})(\d{0,5})(\d{0,4})/, function(_, ddd, first, second) {
            if (!first) return `(${ddd}`;
            if (!second) return `(${ddd}) ${first}`;
            return `(${ddd}) ${first}-${second}`;
        });

        user_tel_input.value = tel_cleaned;


        // garantindo que o usuário escreva certo
        if (validations_rules.tel_char.test(tel_value)){
            error_message[1].classList.remove('error');
            error_message[1].classList.remove('warning');
            error_message[1].classList.add('valid');

            error_message[1].style.display = 'flex'
            error_message[1].textContent = 'Formato aceito!';
            
            
        } else{
            error_message[1].classList.add('error');
            error_message[1].classList.remove('warning');
            error_message[1].classList.remove('valid');

            error_message[1].style.display = 'flex';
            error_message[1].textContent = 'Atenção! Você apertou a tecla errada.';
            
        
        } if( tel_value == ''){
            error_message[1].classList.add('error');
            error_message[1].classList.remove('warning');
            error_message[1].classList.remove('valid');

            error_message[1].style.display = 'flex';
            error_message[1].textContent = 'Atenção! O campo precisa ser preenchido.';


        }

    })

}

function inspector_services_choices(){

}

function inspector_valid_date(){
    let display_date = document.querySelector('.message_data');
    
    let date_today = new Date(); // colocando a data do dia
    const date_input = document.getElementById('calendar_input');


    // validando a data escolhida conforme a data atual
    date_input.addEventListener('change', (event) =>{
        let date_user = new Date(event.target.value  + 'T00:00:00');
        //  + 'T00:00:00' = Forçar o padrão de hoario para local. Estava dando problema
        //                  colocando um dia após o dia atual.


        //resetando a hora pra não dar erro de compatibilidade com o sistema
        // sistema conta milisegundos, o que vai causar diferença
        date_user.setHours(0,0,0,0);
        date_today.setHours(0,0,0,0);

        switch (true){
            case(date_user.getTime() < date_today.getTime()):
                display_date.textContent = 'Atenção! Esta data já passou.'
                display_date.classList.add('date_error');
                display_date.classList.remove('date_valid', 'date_warning');
                break;

            case (date_user.getTime() === date_today.getTime() ):
                display_date.textContent = 'Cuidado! Data muito próxima, verifique se é o ideal.'
                display_date.classList.remove('date_error', 'date_valid');
                display_date.classList.add('date_warning');
                
                break;

                case(date_user.getTime() > date_today.getTime()):
                    display_date.textContent = 'Data válida.'
                    display_date.classList.remove('date_warning', 'date_error');
                    display_date.classList.add('date_valid');
                break;
        }

        
    })

    

}

function inspector_message_user(){
    // vai contar quantos caracteres estão sendo escritos pelo usuario. 
    // vai dar feedbackvisual quando chegar no limite máximo
    let message_input = document.getElementById('user_message');
    let counter_container = document.querySelector('.counter_char_container');
    let max_length = message_input.getAttribute('maxlength');

    message_input.addEventListener('input', () =>{
        let message_user = message_input.value

        if(message_user.length < max_length){
            message_input.classList.remove('max_lenght');
            counter_container.classList.remove('error')
        } else if(message_user.length == max_length){
            message_input.classList.add('max_lenght');
            counter_container.classList.add('error')

        }
        counter_container.textContent = `${message_user.length}/${max_length}`
    }) 
}

// clickers 
function clicker_services_choices(){
    // contador por tipo de serviço a partir do clique
    let counter_services_display = document.querySelector('.contador_servicos');
    let eyebrows_inputs = document.querySelectorAll('.eyebrow_input') // retorna um array
    let eyelashes_inputs = document.querySelectorAll('.eyelash_input') // retorna um array
    let button_services = document.querySelectorAll('.label_container_radio'); //retorna um array


    button_services.forEach(button => {
        button.addEventListener('click', ()=>{
            let counter_services_chosen = 0;

            eyebrows_inputs.forEach(input => {
                if(input.checked){
                    counter_services_chosen += 1;
                    
                }
            });
        
            eyelashes_inputs.forEach(input => {
                if(input.checked){
                    counter_services_chosen += 1;
                }
            });

            counter_services_display.textContent = `${counter_services_chosen}/2`;
        })

        
    });
    
    
}

function clicker_services_reset(){
    const reset_button = document.querySelector('.button_reset');
    const eyebrow_services = document.querySelectorAll('.eyebrow_input');
    const eyelashes_services = document.querySelectorAll('.eyelash_input');

    const counter_services_display = document.querySelector('.contador_servicos');

    reset_button.addEventListener('click', ()=>{
        eyebrow_services.forEach(service =>{
            service.checked = false;
        });

        eyelashes_services.forEach(service =>{
            service.checked = false;
        })

        counter_services_display.textContent = '0/0';
    })

}

function clicker_hour_choices(){
    // vai pegar o valor do id e desabilitar os outros conforme selecionado

    const day_period_buttons = document.querySelectorAll('.input_time');
    const input_all_day = document.getElementById('time_allday');
    let day_periods_list = [];
    let day_period = ' ';

    let test_lista = document.querySelector('.services_list')

    day_period_buttons.forEach(button =>{
        button.addEventListener('change', ()=>{
            
            day_period = button.getAttribute('id');
            const label = document.querySelector(`label[for="${day_period}"]`);

            

            if(button.checked){
                // dando feedback visual ao label: clicou, mudou de cor
                label.classList.add('active')
                // confere se o input ativo esta na lista
                if(day_periods_list.includes(day_period)){
                    day_period = ' ';
                    
                } else{
                    //adiciona se n tiver
                    day_periods_list.push(day_period);
                    day_period = ' ';
                }

                

            } else{
                // dando feedback visual ao label: clicou, mudou de cor
                label.classList.remove('active')
                // vai retirar se ele não estiver ativo
                if(day_periods_list.includes(day_period)){
                    let index_item = day_periods_list.indexOf(day_period);

                    if(index_item != -1){
                        day_periods_list.splice(index_item, 1)
                    }
                }

                
            }

            test_lista.textContent = `Período(s) Escolhido(s): ${day_periods_list}`;
        })

        
    });

    input_all_day.addEventListener('change', () =>{
        if(input_all_day.checked){
            

            day_period_buttons.forEach(button =>{
                button.checked = true;
                let button_value = button.getAttribute('id')
                const label = document.querySelector(`label[for="${button_value}"]`);

                day_periods_list.push(button_value)

                label.classList.add('active')
            })
        } else{
            day_period_buttons.forEach(button =>{
                let button_value = button.getAttribute('id')
                const label = document.querySelector(`label[for="${button_value}"]`);

                button.checked = false;
                day_periods_list = [];
                label.classList.remove('active')

            })
        }
        test_lista.textContent = `Período(s) Escolhido(s): ${day_periods_list}`;
    })

    

    


    
    
}



// chamando as funções 
window.addEventListener('load', ()=>{
    inspector_contact_info();
    inspector_valid_date();
    inspector_message_user();

    clicker_services_choices();
    clicker_services_reset();
    clicker_hour_choices()
    
});

