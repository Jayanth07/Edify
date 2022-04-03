function selectTutor(tutorId) {
    return {
        type: 'SELECT_TUTOR',
        payload: {
            id: tutorId
        }
    }
}

export { selectTutor }