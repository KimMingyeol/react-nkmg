// import styles from "./Hello.module.css"
import { useState } from "react";

export default function Hello(props) {
    // console.log(props);
    // let name = "Mike";
    const [name, setName] = useState("Mike");
    const [age, setAge] = useState(props.age);
    let msg = age > 30 ? "성년" : "미?성년";
    console.log("then here");

    function changeName() {
        console.log("here first");
        const newName = name === "Mike" ? "Jane" : "Mike"; // per component
        // document.getElementById("name").innerText = name;
        setName(newName);
        setAge(age+1);
    }
    // function showName() {
    //     console.log("Mike");
    // }
    
    // function showAge(age) {
    //     console.log(age);
    // }

    // function showText(e) {
    //     console.log(e.target.value);
    // }
    return (
        <div>
            <h1 style={
                {
                    color:"#f00",
                    borderRight:'2px solid #000',
                    marginBottom: '30px',
                    opacity:0.5
                }
            }>Hello</h1>
            <h2 id="name">{name}({age}) : {msg}</h2>
            <button onClick={changeName}>Change</button>
            
            {/* <button onClick={showName}>Show name</button>
            <button
            onClick={() => {
                showAge(10);
            }}>Show age</button>
            <input type="text" onChange={((e)=>{
                console.log(e.target.value);
            })}/> */}
            {/* <div className={styles.box}></div> */}
        </div>
    );
}