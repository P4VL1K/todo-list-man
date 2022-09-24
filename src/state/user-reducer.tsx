type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let stateCopy = {...state}
            stateCopy.age = stateCopy.age + 1
            return stateCopy
        case 'INCREMENT-CHILDREN-COUNT':
            return {
                ...state, childrenCount: state.childrenCount + 1
            }
        case 'CHANGE-NAME':
            return {
                ...state, name: 'Pasha'
            }
        default:
            throw new Error('I don\'t understand this type')
    }
}
