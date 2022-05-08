const Hello = () => {
  return (
    <div>
      <p>Hello World</p>
    </div>
  )
}

const App = () => {
  console.log('Hello from component')
  return (
    <div>
      <Hello />
      <Hello />
      <Hello />
    </div>
  )
}

export default App;
