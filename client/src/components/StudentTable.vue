<script setup> 
import { useStudentStore } from '../stores/StudentStore.js';

import { storeToRefs } from 'pinia';

import {computed } from 'vue'

import StudentRow from './StudentRow.vue';

// Use the student store for accessing student data and methods
const studentStore = useStudentStore()

// Extract reactive state from the student store
const { sortedStudents, studentCount}  = storeToRefs(studentStore)

// Function to delete a student from the store
const deleteStudent = (student) => {
    studentStore.deleteStudent(student)
}


// Function to mark a student's presence status as 'arrived' or 'left'
const arrivedOrLeft = (student, isStudentPresent ) => {
    student.present = isStudentPresent
    studentStore.arrivedOrLeft(student)
}

const pluralStudentMessage = computed (() => {
    if (studentCount.value == 1) {
        return 'There is 1 student in class'
    } else {
        return `There are ${studentCount.value} student in class.`
    }
})



</script>

<template>

<div id="student-list-table" class="card m-2 p-2">
        <h4 class="card-title">Student List</h4>
        <h5 class="card-subtitle text-muted"> {{ pluralStudentMessage }} </h5> <!-- Display the total number of students -->
            
        <div id="student-table">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>StarID</th>
                            <th>Present?</th>
                            <th>Delete?</th>
                        </tr>
                    </thead>

                   <tbody>
                        <StudentRow 
                            v-for="student in sortedStudents"
                            v-bind:student="student"
                            v-on:arrived-or-left="arrivedOrLeft" 
                            v-on:delete-student="deleteStudent"
                        ></StudentRow>
                </tbody>
            </table>
        </div>
    </div>

        
</template>


<style scoped>

#student-table {
    max-height: 400px;
    overflow: scroll;
}

th, tr {
    width: 25%;
}



    
</style>