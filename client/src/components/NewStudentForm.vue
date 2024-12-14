<script setup> 

import {ref, watch} from 'vue'

import { useStudentStore } from '../stores/StudentStore.js';
import { storeToRefs} from 'pinia';

const studentStore = useStudentStore()

const newStudentName = ref('')
const newStarID = ref('')

const formErrors = ref([])

const { addNewStudentErrors} = storeToRefs(studentStore)

watch ( addNewStudentErrors, () => {
    if (addNewStudentErrors.value && addNewStudentErrors.value.length > 0){
    alert(addNewStudentErrors.value.join('\n'))
    }
})

const addStudent = () => {

    formErrors.value = [] //reset form errors

    //Check if newStudents is invalid
    if (newStudentName.value.length == 0 ) {
        formErrors.value.push('Student name must be entered')
    }

    if (newStarID.value.length == 0) {
        formErrors.value.push('StarID must be entered')
    }

    //If there are no errors - is the form valid
    if (formErrors.value.length == 0 ) {
        let student = {
            name: newStudentName.value,
            starID: newStarID.value,
            present: false
        }

        //TODO - how to add student?

        studentStore.addNewStudent(student)

        newStudentName.value='' //clear form input
        newStarID.value =''
    }
 }




</script>

<template>

<div id="new-student-form-errors" class="m-2">
    <!-- TODO show errors from form validation -->
             <div v-if="formErrors.length > 0" class="alert alert-danger">
                <li v-for="error in formErrors"> <!-- Loop through errors and display each one -->
                    {{ error }}
                </li>
             </div>
        </div>


        <div id="new-student-form" class="card add-student m-2 p-2">
            <h4 class="card-title">Add new student</h4>

            <div class="form-group mb-3">
                <label for="name">Name</label>
                <!-- v-model newStudentName -->
                <input v-model.trim="newStudentName" id="name" class="form-control">
            </div>

            <div class="form-group mb-3">
                <label for="starID">Star ID</label>
                 <!-- v-model newStarID -->
                <input v-model.trim="newStarID" id="starID" class="form-control">
            </div>

            <!-- v-on:click event handler -->
            <button v-on:click="addStudent" class="btn btn-primary">Add</button> <!-- Button to Add Student -->
        </div>

</template>


<style scoped>

/*CSS for this componet here*/

    
</style>