<script setup lang="ts">
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Tag from 'primevue/tag';
import { onMounted, ref } from 'vue';

type UserCompany = {
  name?: string;
  title?: string;
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  image: string;
  company?: UserCompany;
};

type UsersResponse = {
  users: User[];
};

const users = ref<User[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const fullName = (user: User) => `${user.firstName} ${user.lastName}`;

const fetchUsers = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch('https://dummyjson.com/users?limit=30');
    if (!response.ok) {
      throw new Error('Failed to fetch users.');
    }

    const data = (await response.json()) as UsersResponse;
    users.value = data.users ?? [];
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load users.';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUsers);
</script>

<template>
  <section class="users-page">
    <header class="header">
      <div class="title-block">
        <h1>User Directory</h1>
      </div>
      <Button
        label="Reload"
        icon="pi pi-refresh"
        severity="secondary"
        :loading="loading"
        @click="fetchUsers"
      />
    </header>

    <p v-if="error" class="error">{{ error }}</p>

    <DataTable
      :value="users"
      :loading="loading"
      data-key="id"
      paginator
      :rows="10"
      :rows-per-page-options="[10, 20, 50]"
      responsive-layout="scroll"
    >
      <Column header="Name">
        <template #body="{ data }">
          <div class="name">{{ fullName(data) }}</div>
        </template>
      </Column>
      <Column field="email" header="Email" />
      <Column field="phone" header="Phone" />
      <Column field="age" header="Age" />
      <Column header="Gender">
        <template #body="{ data }">
          <Tag
            :value="data.gender"
            :severity="data.gender === 'female' ? 'info' : 'success'"
          />
        </template>
      </Column>
      <Column header="Company">
        <template #body="{ data }">
          {{ data.company?.name ?? '—' }}
        </template>
      </Column>
    </DataTable>
  </section>
</template>

<style scoped>
.users-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.title-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.header p {
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
}

.error {
  margin: 0;
  color: #dc2626;
  font-weight: 600;
}

.name {
  font-weight: 600;
}
</style>
