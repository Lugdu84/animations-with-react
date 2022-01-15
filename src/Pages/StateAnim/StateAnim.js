import React, {useState, useRef, useEffect} from 'react'
import "./StateAnim.css"
import {useTransition, animated} from "react-spring"
import { v4 as uuidv4 } from 'uuid'

export default function StateAnim() {

  // pour ne pas animer au démarrage
  const [firstDisplay, setFirstDisplay] = useState(true)

  const [inputData, setInputData] = useState([
    {
      id: uuidv4(),
      txt: "Chopin"
    },
    {
      id: uuidv4(),
      txt: "Mozart"
    },
    {
      id: uuidv4(),
      txt: "Bach"
    },
  ])

  const inputRef = useRef();

  const handleData = e => {
    e.preventDefault();

    if (inputRef.current.value !== "") {
      const newObj = {
        id: uuidv4(),
        txt: inputRef.current.value,
      };
      setInputData([...inputData, newObj]);
      inputRef.current.value = "";
    }

  }

  useEffect(() => {
    setTimeout(() => {
      setFirstDisplay(false)
    }, 1000);
  }, [])

  const listTransitions = useTransition(inputData, {
    from : {opacity: 0, transform: 'translateY(10px)'},
    enter : {opacity: 1, transform: 'translateY(0px)'},
    keys: inputData.map((item) => item.id)
  })

  return (
    <form onSubmit={handleData}>
      <label htmlFor="compositeur">Renseignez vos compositeurs préférés</label>
      <input ref={inputRef} type="text" id="compositeur" />
      {firstDisplay ? (
        <ul>
          {inputData.map((item) => (
            <li key={item.id}>{item.txt}</li>
          ))}
        </ul>
      ) : (
        <ul>
          {listTransitions((styles, item) => {
            return <animated.li style={styles}>{item.txt}</animated.li>;
          })}
        </ul>
      )}
    </form>
  );
}




