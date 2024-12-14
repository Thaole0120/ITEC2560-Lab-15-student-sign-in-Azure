<script setup>

import { ref } from 'vue';

// Defining component props
const props = defineProps({
    student: Object //The 'student' prop will contain the student's data
})

// Defining emitted events that this component will trigger, these events will be listened to by the parent component
const emit = defineEmits (['arrived-or-left', 'delete-student'])

// Creating a reactive reference `isStudentPresent` to track the student's attendance status
const isStudentPresent = ref (props.student.present)

const notifyArrivedOrLeft = () => {
    // tell parent that student arrived or left - emit event
    emit('arrived-or-left', props.student, isStudentPresent.value)
}

const confirmThenDeleteStudent = () => {
    if (confirm(`Delete ${props.student.name}?`)) {
    emit('delete-student', props.student)
    }
}

</script>

<template>

    <tr class="align-middle" v-bind:class="{ present: student.present, absent: !student.present }">

        <td>{{ student.name }}</td>
        <td>{{student.starID}}</td>
        <td>
            <input type="checkbox" v-model="isStudentPresent" v-on:change="notifyArrivedOrLeft">
            <span v-if="student.present" class="mx-3">Here!</span>
            <span v-else class="mx-3">Not present</span>
        </td> <!--check box for present/absent-->
        <td>
            <button v-on:click="confirmThenDeleteStudent" class="btn btn-danger">
                <i class="bi bi-trash-fill"></i>Delete
            </button>
        </td> 
        </tr>


</template>


<style scoped>

.present {
    color: gray;
    font-style: italic;
}

.absent {
    color: black;
    font-weight: bold;
}

</style>