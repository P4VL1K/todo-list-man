import { userReducer } from './user-reducer'

test('user reducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}
    // your code here
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(3)
    expect(endState.age).toBe(20)
})

test('user reducer should change only neme', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}

    const endState = userReducer(startState,{type: 'CHANGE-NAME'})

    expect(endState.name).toBe('Pasha')
    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(2)
})
