<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">{{ $t('userManagement') }}</h2>
    <div v-if="users.length">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">{{ $t('firstName') }}</th>
              <th scope="col">{{ $t('lastName') }}</th>
              <th scope="col">{{ $t('email') }}</th>
              <th scope="col">{{ $t('status') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" @click="selectUser(user)" style="cursor: pointer;">
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.status ? $t('accepted') : $t('pending') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="selectedUser" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ $t('userDetails') }}</h5>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-lg-6">
                  <p><strong>{{ $t('applicationNumber') }}:</strong> <br> {{ selectedUser.applicationNumber }}</p>
                  <p><strong>{{ $t('date') }}:</strong> <br> {{ selectedUser.date }}</p>
                  <p><strong>{{ $t('firstName') }}:</strong> <br> {{ selectedUser.firstName }}</p>
                  <p><strong>{{ $t('lastName') }}:</strong> <br> {{ selectedUser.lastName }}</p>
                  <p><strong>{{ $t('patronymic') }}:</strong> <br> {{ selectedUser.patronymic }}</p>
                  <p><strong>{{ $t('passportSeries') }}:</strong> <br> {{ selectedUser.passportSeries }}</p>
                  <p><strong>{{ $t('passportNumber') }}:</strong> <br> {{ selectedUser.passportNumber }}</p>
                  <p><strong>{{ $t('gender') }}:</strong> <br> {{ selectedUser.gender }}</p>
                  <p><strong>{{ $t('faculty') }}:</strong> <br> {{ selectedUser.faculty }}</p>
                  <p><strong>{{ $t('educationTime') }}:</strong> <br> {{ selectedUser.educationTime }}</p>
                </div>
                <div class="col-lg-6">
                  <p><strong>{{ $t('educationLevel') }}:</strong> <br> {{ selectedUser.educationLevel }}</p>
                  <p><strong>{{ $t('educationMajor') }}:</strong> <br> {{ selectedUser.educationMajor }}</p>
                  <p><strong>{{ $t('email') }}:</strong> <br> {{ selectedUser.email }}</p>
                  <p><strong>{{ $t('passportFile') }}:</strong> <br> <a target="_blanck" :href="selectedUser.passportFile"><img width="120" :src="selectedUser.passportFile" :alt="$t('passportFile')"></a></p>
                  <p><strong>{{ $t('certificate') }}:</strong> <br> <a target="_blanck" :href="selectedUser.certificate"><img width="120" :src="selectedUser.certificate" :alt="$t('certificate')"></a></p>
                  <p><strong>{{ $t('photo') }}:</strong> <br> <a target="_blanck" :href="selectedUser.photo"><img width="120" :src="selectedUser.photo" :alt="$t('photo')"></a></p>
                  <p><strong>{{ $t('status') }}:</strong></p>
                  <select v-model="selectedUser.status" class="form-control">
                    <option  disabled value="">{{ $t('pending') }}</option>
                    <option :selected="selectedUser.status === 'accepted'" value="accepted">{{ $t('accepted') }}</option>
                    <option :selected="selectedUser.status === 'rejected'" value="rejected">{{ $t('rejected') }}</option>
                </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="selectedUser = null">{{ $t('close') }}</button>
              <button type="button" class="btn btn-primary" @click="updateUser">{{ $t('saveChanges') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center">{{ $t('noUsers') }}</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Admin',
  data() {
    return {
      users: [],
      selectedUser: null,
      lang: localStorage.getItem('lang') || 'en',
      translations: {
        en: {
          passportFile: "Passport",
          certificate: "Diploma",
          photo: "Photo (3x4)",
          applicationNumber: "Application Number",
          date: "Date",
          firstName: 'First Name',
          lastName: 'Last Name',
          patronymic: 'Patronymic',
          passportSeries: 'Passport Series',
          passportNumber: 'Passport Number',
          gender: 'Gender',
          faculty: 'Faculty',
          educationTime: 'Education Time',
          educationLevel: 'Education Level',
          educationMajor: 'Education Major',
          passportFile: 'Passport File',
          certificate: 'Certificate',
          photo: 'Photo',
          email: 'Email',
          applicationNumber: 'Application Number',
          status: 'Status',
          date: 'Date',
          id: 'ID',
          userDetails: 'User Details',
          pending: 'Pending',
          accepted: 'Accepted',
          rejected: 'Rejected',
          close: 'Close',
          saveChanges: 'Save Changes',
          noUsers: 'No users found.',
          userManagement: 'User Management'
        },
        uz: {
          passportFile: "Passport",
          certificate: "Diplom",
          photo: "Foto (3x4)",
          applicationNumber: "Ariza raqami",
          date: "Vaqt",
          firstName: 'Ism',
          lastName: 'Familya',
          patronymic: 'Sharif',
          passportSeries: 'Passport Seriya',
          passportNumber: 'Passport Raqami',
          gender: 'Jins',
          faculty: 'Fakultet',
          educationTime: 'Ta\'lim shakli',
          educationLevel: 'Ta\'lim darajasi',
          educationMajor: 'Ta\'lim yo\'nalishi',
          passportFile: 'Passport Fayli',
          certificate: 'Sertifikat yoki diplom',
          photo: '3x4 Rasm',
          email: 'Elektron pochta',
          applicationNumber: 'Ariza raqami',
          status: 'Holat',
          date: 'Sana',
          id: 'ID',
          userDetails: 'Foydalanuvchi Ma\'lumotlari',
          pending: 'Kutilmoqda',
          accepted: 'Qabul qilindi',
          rejected: 'Rad etildi',
          close: 'Yopish',
          saveChanges: 'Saqlash',
          noUsers: 'Foydalanuvchilar topilmadi.',
          userManagement: 'Foydalanuvchilar boshqarish',
        },
        ru: {
          passportFile: "Пасспорт",
          certificate: "Диплом",
          photo: "Фото (3х4)",
          applicationNumber: "Номер заявления",
          date: "Vaqt",
          firstName: 'Имя',
          lastName: 'Фамилия',
          patronymic: 'Отчество',
          passportSeries: 'Серия паспорта',
          passportNumber: 'Номер паспорта',
          gender: 'Пол',
          faculty: 'Факультет',
          educationTime: 'Форма обучения',
          educationLevel: 'Уровень образования',
          educationMajor: 'Направление образования',
          passportFile: 'Файл паспорта',
          certificate: 'Сертификат или диплом',
          photo: 'Фото 3x4',
          email: 'Электронная почта',
          applicationNumber: 'Номер заявки',
          status: 'Статус',
          date: 'Дата',
          id: 'ID',
          userDetails: 'Информация о пользователе',
          pending: 'Ожидает',
          accepted: 'Принят',
          rejected: 'Отклонен',
          close: 'Закрыть',
          saveChanges: 'Сохранить изменения',
          noUsers: 'Пользователи не найдены.',
          userManagement: 'Управление пользователями'
        }
      }
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('https://664491136c6a6565870b1a77.mockapi.io/v1/users');
        this.users = response.data.map(user => {
          if (!user.status) {
            user.status = false;
          }
          return user;
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    selectUser(user) {
      this.selectedUser = { ...user };
    },
    async updateUser() {
      try {
        const response = await axios.put(`https://664491136c6a6565870b1a77.mockapi.io/v1/users/${this.selectedUser.id}`, this.selectedUser);
        this.fetchUsers();
        this.selectedUser = null;
        console.log('User updated successfully:', response.data);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    handleChangeLang() {
      localStorage.setItem('lang', this.lang);
    },
    $t(key) {
      return this.translations[this.lang][key];
    }
  }
};
</script>

<style>
.modal {
  display: block !important;
  background: rgba(0,0,0,0.5);
}

@media (max-width: 767.98px) {
  .modal-dialog {
    max-width: 100%;
   
  }}

  </style>