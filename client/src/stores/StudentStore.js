
// Importing necessary functions from Pinia and Vue
import { defineStore } from 'pinia'
import {ref, computed} from 'vue'
import {mande} from 'mande'

const studentAPI = mande('api/students')


// Define the Pinia store named 'students'
export const useStudentStore = defineStore ('students', () => {

    // Reactive state: studentList holds all student data
    const sortedStudents = ref ([])

    const mostRecentStudent = ref( {}) //empty object

    const addNewStudentErrors = ref ([])

    function getAllStudents() {
        //make API request to get all students and save in store - studentList
        studentAPI.get().then( students => { //students is the JSON response from the API
            sortedStudents.value = students
        }).catch ( err => {
            console.log(err)
        })
    }


    function addNewStudent(student) {  //TODO make api request to add a new student
        //call getAllStudents to re-request list of students from API server
        studentAPI.post(student).then( () => {
            getAllStudents()
        }).catch( err => {
            addNewStudentErrors.value = err.body
        })
        
    }


    function deleteStudent(studentToDelete) {
        //TODO make api request
    const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`)
        deleteStudentAPI.delete().then( () => {
            mostRecentStudent.value = {}
            getAllStudents()
       }).catch ( err => {
        console.log(err)
    })
    }

    // Function to set a student as the most recent one that arrived or left
    function arrivedOrLeft(student) {
      //TODO make api request 
        const editStudentAPI = mande(`/api/students/${student.id}`)
        editStudentAPI.patch(student).then( () => {
            mostRecentStudent.value = student
            getAllStudents()
        }).catch ( err => {
            console.log(err)
        })
    }


    const studentCount = computed( () => {
        return sortedStudents.value.length
    })


    return {
        //reactive data
        sortedStudents,
        mostRecentStudent,
        addNewStudentErrors,

        //functions
        getAllStudents,
        addNewStudent,
        deleteStudent,
        arrivedOrLeft,

        //computed properties
        studentCount,
        sortedStudents

    }


})