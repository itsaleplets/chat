import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { userMessage, botMessage, sendFormInfo } from '../../actions/chatnilson';
import { Button, Input, Notification } from "rbx";
import { replies, inputs } from '../../replies';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import * as Yup from 'yup';
import "rbx/index.css";

const Chat = ({ chat, userMessage, botMessage, sendFormInfo }) => {
  const [message, setMessage] = useState('');
  const [formInfo, setFormInfo] = useState({});
  const [index, setIndex] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [validationErr, setValidationErr] = useState('');
  const endOfMessages = useRef(null);

  const scrollToBottom = () => {
    endOfMessages.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [chat]);

  const validate = Yup.object().shape({
    email: Yup.string()
      .email('Email informado é inválido.'),
  });

  const handleClick = async(inputName) => {    
    if(message.length === 0) {
      return alert('Campo não pode estar vazio')
    }

    userMessage(message);
    setTimeout(() => {
      handleReply();
    }, 500);
    setFormInfo({...formInfo, [inputName]: message })
    setMessage('');
  }

  const handleReply = () => {
    if (index === 0) {
      replies[index] = `Que satisfação, ${message}. Agora que sei seu nome, qual a cidade e estado que você mora?'`
    }
    setIndex(index + 1);
    botMessage(replies[index]);
  };

  const saveInfo = (e) => {
    console.log(formInfo);
    validate.validate(formInfo)
    .then(() => sendFormInfo(formInfo))
    .catch((err) => {
      setIsValid(false);
      setValidationErr(err.errors);
    })
  };

  const handleEnter = (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      e.preventDefault();
    }
  }

  return (
    <div className="container">
    <h1 className="title">Fale conosco</h1>
    <div className="chat">
      {!isValid && <Notification color="dark">{validationErr[0]}</Notification> }
      <Formik
        //Não está sendo utilizado o "initialValues" porque os dados estão sendo guardados na store do redux.
      >
        {formik => (
          <form onSubmit="false">
            <div className="historyContainer">
              {chat.length === 0 ? '' 
              : chat.map((msg, index) => <div className={ `msg ${msg.type}`} key={ index }> { msg.message } </div>)}

               {/*Escolhi usar o Rater pois ajuda a diminuir o código em dezenas de linhas e tem uma funcionalidade dinâmica  */}
               {console.log(index)}
              {index >= 4 && chat.length > 1 &&
                <div className="msg rating">
                  <Rater onRate={ ({rating}) => setFormInfo({...formInfo, rating }) } total={5} />
               </div> 
              }

              <div className="background-img" ref={endOfMessages}></div>
            </div>
            <div className="btn">
              <Button type="submit">Limpar</Button>
            </div>
          </form>
        )}
      </Formik>        
        {index < 4 ? 
          <div>
            <Input
              id="chatBox"
              type={inputs[index]}
              name={inputs[index]}
              onKeyPress={handleEnter}
              onChange={ (e) => setMessage(e.target.value) } value={ message }
            />
            <div className="btn">
              <Button color="danger" type="button" onClick={ () => handleClick(inputs[index]) }> 
                ENVIAR 
              </Button>
            </div>
          </div>
        :
        <div className="btn">
          <Button size="medium" color="danger" type="button" onClick={ saveInfo }> SALVAR </Button>
        </div>

        }
    </div>
  </div>
  );
}

const mapStateToProps = (state) => ({
  chat: state.chatnilson.messages
});

export default connect(mapStateToProps, { userMessage, botMessage, sendFormInfo })(Chat);
