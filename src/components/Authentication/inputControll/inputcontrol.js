import React from "react";
import './inputcontrol.css'

const InputControl=(props)=>{

    return(
    <div className="input_container">
    {props.label&&<label>{props.label}</label>}
    <br/>
    <input {...props}/>
    </div>
    )

}

export default InputControl;