const Tweet = (props) => {
    return (
        <div>
            <p>Username: {props.username}</p>
            <p>Name: {props.name}</p>
            <span>{props.date}:</span>
            <span style={{marginRight: '1em'}}></span>
            <span>{props.message}</span>
        </div>
        
    )
}