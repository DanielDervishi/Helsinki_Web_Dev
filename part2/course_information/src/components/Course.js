import React from 'react'


const Course = ({ course }) => {
    const { name, parts } = course
    return (
        <>
            <Header name={name} />
            <Content parts={parts} />
        </>
    )
}
import React from 'react'

const Header = ({ name }) => {
    return (<h1>{name}</h1>)
}

const Part = ({ name, exercises }) => {
    return (<div>{name} {exercises}</div>)
}
const Content = ({ parts }) => {
    return (
        <div>
            <ul>
                {parts.map(data => <Part key={data.id} name={data.name} exercises={data.exercises} />)}
            </ul>
        </div>
    )
}

export default Course