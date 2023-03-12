<template>
    <main>
        <div>
            <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
            Current Services
            </h1>
            <table align="center">
      <thead>
        <tr>
          <th>Services</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(service, index) in services" :key="index">
          <td>{{ service.name }}</td>
          <td>
            <button @click="editService(service)">Edit</button>
            <button @click="deleteService(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <form v-if="showForm" @submit.prevent="saveService">
      <label>Service Name:</label>
      <input v-model="newService.name" type="text">
      <button type="submit">Save</button>
    </form>
    <button style="display: block; margin: 0 auto;" @click="showForm = true">Add Service</button>
        </div>
    </main>
</template>

<script>
export default {
  data() {
    return {
      services: [
        { name: 'Family Support' },
        { name: 'Adult Education' },
        { name: 'Youth Services Program' },
        { name: 'Early Childhood Education' },
      ],
      newService: { name: '' },
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
};
</script>
