function selectTutor(tutorId) {
    return {
        type: 'SELECT_TUTOR',
        payload: {
            id: tutorId
        }
    }
}

function setTutors(tutors) {
    return {
        type: 'SET_TUTORS',
        payload: {
            tutors
        }
    }
}

function setLoginState(token, userType) {
    return {
        type: 'LOGIN',
        payload: {
            token,
            userType
        }
    }
}

export { selectTutor, setTutors, setLoginState }