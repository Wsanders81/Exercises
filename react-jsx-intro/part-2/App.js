const App = ()=> {
    return (
        <div>
            <Tweet username="Willis" name="Will" date={new Date().toDateString()} message="This is the first tweet"  />
            <Tweet username="Shaquille.Oatmeal" name="Shaq" date={new Date().toDateString()} message="This is the second tweet"  />
            <Tweet username="JoeNotExotic" name="Joe" date={new Date().toDateString()} message="This is the third tweet"  />
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))