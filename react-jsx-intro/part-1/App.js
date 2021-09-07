const App = () => {
return (
    <div>
    <FirstComponent/>
    <NamedComponent name="My name is Will"/>
    </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))