import { IPermissions , IUser } from './interfaces';
export const permissions: IPermissions = {
  getUsers: {
    all: ['head-trainer'],
    delete: [],
    read : ['trainee', 'trainer'],
    write : ['trainer'],
  },
};
export const users: IUser[] = [
    {
      reviewerEmail: 'reviewer1@successive.tech', traineeEmail: 'trainee@successive.tech' },
    {
      reviewerEmail: 'reviewer21@successive.tech', traineeEmail: '*trainee2@successive.tech' },
    {
      reviewerEmail: '%reviewer1@successive.tech', traineeEmail: 'trainee@successive22.tech' },
];
