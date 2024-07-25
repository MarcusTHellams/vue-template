<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { Button } from '@/components';
import { ref } from 'vue';

const queryEnabled = ref(false);

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

const enableQueryHandler = () => {
  queryEnabled.value = !queryEnabled.value;
};

const userQuery = useQuery({
  queryKey: ['users'],
  async queryFn() {
    return axios.get<User>('https://jsonplaceholder.typicode.com/users/1').then(({ data }) => data);
  },
  enabled: queryEnabled,
});
const { data: user } = userQuery;
</script>

<template>
  <main class="container mt-16">
    <h1>Hello World</h1>
    <p><Button @click="enableQueryHandler">Fetch Query</Button></p>
    <pre data-testid="fetchedData" v-if="user">
      {{ user }}
    </pre>
  </main>
</template>
