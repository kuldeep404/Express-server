export const permissions= {
    'getUsers': {
    all: ['head-trainer'],
    read : ['trainee', 'trainer'],
    write : ['trainer'],
    delete: [],
    }}

export let users_new =[{
    traineeEmail: 'trainee@successive.tech',reviewerEmail: 'reviewer1@successive.tech'},
    {
    traineeEmail: '*trainee2@successive.tech',reviewerEmail: 'reviewer21@successive.tech'},
    {
    traineeEmail: 'trainee@successive22.tech',reviewerEmail: '%reviewer1@successive.tech'
    }]
  