const Header = () => {
  const course = 'Half Stack application development'
  return (<h1>{course}</h1>)
}
const Content = () => {
  return (
    <div>
      <Part part_name="Fundamentals of React" num_exercises={10} />
      <Part part_name='Using props to pass data' num_exercises={7} />
      <Part part_name='State of a component' num_exercises={14} />
    </div>
  )
}
const Part = (props) => {
  return (<p>
    {props.part_name} {props.num_exercises}
  </p>)
}

const Total = () => {
  return (<p>Number of exercises {10 + 7 + 14}</p>)
}

const App = () => {
  return (
    <div>
      <Header />
      <Content />
      <Total />
    </div>
  )
}

export default App