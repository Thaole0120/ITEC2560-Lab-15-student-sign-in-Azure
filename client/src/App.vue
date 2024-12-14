<script setup> 
//code here
import {onMounted} from 'vue'

import NewStudentForm from './components/NewStudentForm.vue';
import StudentTable from './components/StudentTable.vue';
import StudentMessage from './components/StudentMessage.vue';

import { useStudentStore } from './stores/StudentStore'

const studentStore = useStudentStore()

onMounted ( () => {
    //whatever is in here will run when the component is first displayed
    studentStore.getAllStudents()
})

</script>



<template>
 <!-- HTML template here-->
  <h1> Student Sign In</h1>

 <NewStudentForm></NewStudentForm>
 <StudentTable></StudentTable>
 <StudentMessage></StudentMessage>




</template>


<style scoped>

h1 {
    margin: 10px;
}

</style>