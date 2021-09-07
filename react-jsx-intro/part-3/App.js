const App = ()=> {
    return (
        <div>
            <Person name="Will" age={39} hobbies={["Hiking", "Working Out", "Gaming"]}/>
            <Person name="Michealango" age={39} hobbies={["Painting ceilings", "Sculpting", "Losing Ears"]}/>
            <Person name="Bruce" age={4} hobbies={["Catch", "Tail Wagging", "Drooling"]}/>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))