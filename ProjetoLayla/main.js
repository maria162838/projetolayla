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



// clickers 
function clicker_services_choices(){
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

// chamando as funções 
window.addEventListener('load', ()=>{
    inspector_contact_info();
    clicker_services_choices();
});

