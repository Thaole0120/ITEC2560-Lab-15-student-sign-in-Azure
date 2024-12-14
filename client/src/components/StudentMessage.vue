<script setup>

import { useStudentStore } from '../stores/StudentStore';
import { storeToRefs } from 'pinia';

const studentStore = useStudentStore()

const {mostRecentStudent} = storeToRefs(studentStore)


</script>

<template>

<div id="welcome-or-goodbye-message" class="m-2">
            
            <!-- show a message when student arrives or leaves  -->
             <div v-if="mostRecentStudent.name">
                <!-- Display Welcome message if the student is present -->
            <div v-if="mostRecentStudent.present" class="alert alert-success">
                Welcome, {{ mostRecentStudent.name}}!
            </div>
            <!-- Display Goodbye message if the student is absent -->
            <div v-else class="alert alert-info">
                Goodbye {{ mostRecentStudent.name}}, see you later. 
            </div>
                
             </div>
            
        </div>

</template>


<style scoped>

/*CSS for this componet here*/

    
</style>