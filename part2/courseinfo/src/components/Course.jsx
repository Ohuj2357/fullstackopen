const Header = (props) => {
    return (
      <h1>{props.course.name}</h1>
    )
  }
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>
    )
  }
  const Content = (props) => {
    return (
      <div>
        {props.course.parts.map(part => 
            <Part key={part.id} name = {part.name} exercises = {part.exercises}/>
        )}
      </div>
    )
  }
  const Total = (props) => {
    return (
      <b><p>total of {props.course.parts.reduce((s, p) => s+p.exercises, 0)} exercises</p></b>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course = {course}/>
        <Content course = {course}/>
        <Total course = {course}/>
      </div>
    )
  }

  export default Course