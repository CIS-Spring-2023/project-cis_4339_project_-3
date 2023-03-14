<template>
    <main>
        <div>
            <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
                Current Services
            </h1>
            <div class="row justify-content-center">
            <table>
                <thead>
                    <tr>
                        <th>Services</th>
                        <th>Status</th>
                        <th v-if="user.role === 'admin'">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(service, index) in services" :key="index">
                        <td>{{ service.name }}</td>
                        <td>{{ service.status }}</td>
                        <td v-if="user.role === 'admin'">
                            <button class="btn btn-secondary mt-3" @click="editService(service)">Edit</button> &nbsp;
                            <button class="btn btn-danger mt-3" @click="deleteService(index)">Delete</button> &nbsp;
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
            <div class="row justify-content-center">
            <form class="form-group" v-if="user.role === 'admin'" @submit.prevent="saveService">
                <div>
                <label>Service Name:</label> &nbsp;
                <input required v-model="newService.name" type="text"/>
            </div>
                <label>Status: </label> &nbsp;
                <input required v-model="newService.status" type="radio" id="active" name="status" value="Active" /> Active
                <input v-model="newService.status" type="radio" id="inactive" name="status" value="Inactive" /> Inactive
                <div>
                <button class="btn btn-primary mt-3" type="submit">Save</button>
            </div>
            </form>
        </div>
        </div>
    </main>
</template>

<script>
import { useLoggedInUserStore } from "@/store/loggedInUser"

export default {
    data() {
        return {
            services: [
                { name: 'Family Support', status: 'Active'},
                { name: 'Adult Education', status: 'Active' },
                { name: 'Youth Services Program', status: 'Active' },
                { name: 'Early Childhood Education', status: 'Active' },
            ],
            newService: { name: '', status:'' },
            editingIndex: null,
            showForm: false,
        };
    },
    methods: {
        saveService() {
            if (this.editingIndex === null) {
                this.services.push(this.newService);
            } else {
                this.services.splice(this.editingIndex, 1, this.newService);
                this.editingIndex = null;
            }
            this.newService = { name: '' };
            this.showForm = false;
        },
        editService(service) {
            this.editingIndex = this.services.indexOf(service);
            this.newService = { ...service };
            this.showForm = true;
        },
        deleteService(index) {
            this.services.splice(index, 1);
        },
    },
    setup() {
    const user = useLoggedInUserStore()
    return {
      // user store to check login status
      user,
    }
  }
};
</script>

<style>
.row.justify-content-center{
    padding-top: 20px;
    padding-left: 150px;
    padding-right: 20px;
}
</style>