const Person = (props) => {
    let message; 
    let name; 
    const hobby = props.hobbies.map(hobby=> <li>{hobby}</li>)
    if(props.age < 18){
        message = "You Must Be 18"
    } else {
        message = "Please Go Vote!"
    }
    if(props.name.length > 8) {
        name = props.name.slice(0,6)
    } else {
        name = props.name
    }
    return (
        <div>
        <p>Learn some information about this Person</p>
            <h3>{message}</h3>
            <p><b>Name: </b>{name}</p>
            <p><b>Age:</b> {props.age}</p>
            <ul><b>Hobbies:</b>
            {hobby}
            </ul>
        
        </div>
        
    )
}