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

export { selectTutor, setTutors }